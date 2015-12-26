process.env.CONFIG_DIR = 'test';
process.env.NODE_ENV = 'development';

var config = require('..');
var assert = require('assert');

describe('Get from development.json function', function () {
    it('Return value', function () {
        assert.equal(config.get('testVal'), 'value');
    });
});

describe('Get from default.json', function () {
    it('Return value', function () {
        assert.equal(config.get('defaultVal'), 'default');
    });
});

describe('GetInt function', function () {
    it('Return number', function () {
        assert.equal(typeof config.getInt('intVal'), 'number');
    });

    it('Return default 123', function () {
        assert.equal(config.getInt('valNotExist', 123), 123);
    });

    it('Return default 0', function () {
        assert.equal(config.getInt('valNotExist'), 0);
    });
});

describe('GetUrl function', function () {
    it('Return url', function () {
        assert.equal(config.getUri('uri', 'path'), 'http://mydomain:3000/url_path');
    });

    it('Path start with /', function () {
        assert.equal(config.getUri('uri', 'path2'), 'http://mydomain:3000/url_path');
    });
});
