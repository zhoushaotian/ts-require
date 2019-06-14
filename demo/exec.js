'use strict';
const cp = require('child_process');
const tool = require('../utils/tool');
const path = require('path');

const defaultOptions = {
    target: 'es6',
    module: 'commonjs',
    tmpDir: path.join(process.cwd(), 'tmp'),
    delTemp: false,
};

cp.execFile('tsc', [path.join(__dirname, './hello.ts')].concat(tool.convertOpt(defaultOptions)), (e, result) => {
    if(e) {
        return console.error(e);
    }
    console.log(result);
});


