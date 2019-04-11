'use strict';
const tsRequire = require('../index');
const assert = require('assert');
const path = require('path');
const fs = require('fs-extra')

describe('test require', () => {
    it('require a ts file without del', () => {
        return tsRequire(path.resolve(__dirname, './ts/test.ts'))
            .then((data) => {
                assert(data.word === 'hello,world!');
                assert(data.test() === 'hello,world!');
                assert(fs.pathExistsSync(path.join(process.cwd(), 'tmp/')), 'if exist tmp dir');
                assert(fs.pathExistsSync(path.join(process.cwd(), './tmp/test.js')), 'if exit tmp test.js file');
            });
    });
    it('require a ts file with del', () => {
        return tsRequire(path.resolve(__dirname, './ts/test.ts'), {
            delTemp: true
        }).then((data) => {
            assert(data.word === 'hello,world!');
            assert(data.test() === 'hello,world!');
            assert(!fs.pathExistsSync(path.join(process.cwd(), 'tmp/')), 'if exist tmp dir');
            assert(!fs.pathExistsSync(path.join(process.cwd(), './tmp/test.js')), 'if exit tmp test.js file');
        });
    });
});