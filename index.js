'use strict';
const path = require('path');
const childProess = require('child_process');

const tsc = path.join(path.dirname(require.resolve('typescript')), './tsc.js');
const tool = require('./utils/tool');
const fs = require('fs-extra');

const defaultOptions = {
    target: 'es5',
    module: 'commonjs',
    tmpDir: path.join(process.cwd(), 'tmp'),
    delTemp: false,
    lib: 'es2015'
};

module.exports = function(module, opt = {}) {
    opt = Object.assign({}, defaultOptions, opt);
    const modulePath = require.resolve(module);
    return new Promise((resolve, reject) => {
        try{
            const child = childProess.fork(tsc, [modulePath].concat(tool.convertOpt(opt)));
            child.on('close', () => {
                const content = require(path.join(opt.tmpDir, path.basename(modulePath, '.ts') + '.js'));
                if(opt.delTemp) {
                    fs.removeSync(opt.tmpDir);
                }
                resolve(content);
            });
        }catch(e) {
        /* istanbul ignore next */
            return reject(e);
        }
    });
    
};

