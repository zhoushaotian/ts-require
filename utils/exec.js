'use strict';
const cp = require('child_process');
const tool = require('./tool');
const fs = require('fs-extra');
const path = require('path');
const tsc = path.join(path.dirname(require.resolve('typescript')), './tsc.js');
const nodeEval = require('node-eval');
const tsNode = require('ts-node');

function handleRequire(filePath, opt) {
    delete require.cache[path.join(opt.tmpDir, path.basename(filePath, '.ts') + '.js')];
    const content = require(path.join(opt.tmpDir, path.basename(filePath, '.ts') + '.js'));
    if(opt.delTemp) {
        fs.removeSync(opt.tmpDir);
    }
    return content;
}

module.exports = function (type, filePath, opt) {
    switch(type) {
    case 'eval':
        return new Promise((resolve, reject) => {
            try {
                const code = fs.readFileSync(filePath).toString();
                const jsCode = tsNode.register({
                    transpileOnly: true,
                    project: opt.project
                }).compile(code, filePath);
                resolve(nodeEval(jsCode, filePath));
            }catch(e) {
                reject(e);
            }
        });
    case 'exec':
        return new Promise((resolve, reject) => {
            cp.execFile('tsc', [filePath].concat(tool.convertOpt(opt)), (e) => {
                if(e) {
                    return reject(e);
                }
                resolve(handleRequire(filePath, opt));
            });
        });
    case 'fork':
    default:
        return new Promise((resolve, reject) => {
            const child = cp.fork(tsc, [filePath].concat(tool.convertOpt(opt)));
            child.on('exit', () => {
                resolve(handleRequire(filePath, opt));
            });
            child.on('error', () => {
                reject();
            });
        });
    }
};
