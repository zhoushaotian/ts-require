'use strict';
const tsRequire = require('../index');
const assert = require('assert');
const path = require('path');
const fs = require('fs-extra');

describe('test require', () => {
    it('require a ts file without del', () => {
        const tsRequireNoDel = tsRequire({
        });
        const data = tsRequireNoDel(path.resolve(__dirname, './ts/test.ts'));
        assert(data.word === 'hello,world!');
        assert(data.test() === 'hello,world!');
        assert(fs.pathExistsSync(path.join(process.cwd(), 'tmp/')), 'if exist tmp dir');
        assert(fs.pathExistsSync(path.join(process.cwd(), './tmp/test.js')), 'if exit tmp test.js file');
    });
    
    it('require a ts file with del', () => {
        const tsRequireDel = tsRequire({
            delTemp: true
        });
        const data = tsRequireDel(path.resolve(__dirname, './ts/test.ts'));
        assert(data.word === 'hello,world!');
        assert(data.test() === 'hello,world!');
        assert(!fs.pathExistsSync(path.join(process.cwd(), 'tmp/')), 'if exist tmp dir');
        assert(!fs.pathExistsSync(path.join(process.cwd(), './tmp/test.js')), 'if exit tmp test.js file');
    });
    it('require a ts file with del and exec mode', () => {
        const tsRequireDel = tsRequire({
            delTemp: true,
            execType: 'exec'
        });
        const data = tsRequireDel(path.resolve(__dirname, './ts/test.ts'));
        assert(data.word === 'hello,world!');
        assert(data.test() === 'hello,world!');
        assert(!fs.pathExistsSync(path.join(process.cwd(), 'tmp/')), 'if exist tmp dir');
        assert(!fs.pathExistsSync(path.join(process.cwd(), './tmp/test.js')), 'if exit tmp test.js file');
    });
});