var config = require('nconf');
var path = require('path');
var appRoot = require('app-root-path');

var configDir = process.env.CONFIG_DIR || 'config';
var configFileDir = path.join(appRoot.path, configDir);

var configName = process.env.NODE_ENV ? process.env.NODE_ENV + '.json' : null;

config.argv()
    .env('_')
    .file('default', {file: path.join(configFileDir, 'default.json')})

if (configName) {
    config.file({file: path.join(configFileDir, configName)});
}


if (get('node:env') === 'development') {
    console.warn('ENVIRONMENT set to "development" mode.');
}

function get(param) {
    return config.get(param.toUpperCase()) || config.get(param);
}

function getInt(param, defValue) {
    var value = get(param);
    return parseInt(value) || defValue || 0;
}

function getUri(section, param) {
    var protocolParam = section + ':' + 'protocol';
    var domainParam = section + ':' + 'domain';
    var portParam = section + ':' + 'port';

    var url = get(protocolParam) + '://' + get(domainParam);
    var port = get(portParam);
    var domainName = port == 80 ? url : url + ':' + port;
    var pathUrl = get(param);

    if (pathUrl[0] == '/') {
        pathUrl = pathUrl.substr(1);
    }

    return domainName + '/' + pathUrl;
}

exports.get = get;
exports.getInt = getInt;
exports.getUri = getUri;