'use strict';
// const cp = require('child_process');
// const tool = require('../utils/tool');
const path = require('path');
const tsNode = require('ts-node');
const fs = require('fs');
// const tsc = require('typescript');
const nodeEval = require('node-eval');

// const defaultOptions = {
//     target: 'es6',
//     module: 'commonjs',
//     tmpDir: path.join(process.cwd(), 'tmp'),
//     delTemp: false,
// };

const code = fs.readFileSync(path.join(__dirname, './hello.ts'));

const result = nodeEval(tsNode.register({
    transpileOnly: true
}).compile(code.toString(), path.join(__dirname, './hello.ts')), 'hello.js');

global.console.log(result);


// const program = tsc.createProgram([path.join(__dirname, './hello.ts')], {});




// cp.execFile('tsc', [path.join(__dirname, './hello.ts')].concat(tool.convertOpt(defaultOptions)), (e, result) => {
//     if(e) {
//         return console.error(e);
//     }
//     console.log(result);
// });


