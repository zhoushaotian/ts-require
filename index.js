'use strict';
const path = require('path');
const childProess = require('child_process');
const deasync = require('deasync');

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

function asyncRequire(module, opt, cb) {
    try{
        const modulePath = require.resolve(module);
        const child = childProess.fork(tsc, [modulePath].concat(tool.convertOpt(opt)));
        child.on('close', () => {
            const content = require(path.join(opt.tmpDir, path.basename(modulePath, '.ts') + '.js'));
            if(opt.delTemp) {
                fs.removeSync(opt.tmpDir);
            }
            cb(null, content);
        });
    }catch(e) {
    /* istanbul ignore next */
        cb(e);
    }
}

module.exports = function(opt = {}) {
    opt = Object.assign({}, defaultOptions, opt);
    return deasync(function(module) {
        const args = Array.prototype.slice.call(arguments);
        const cb = args[args.length - 1];
        asyncRequire(module, opt, cb);
    });
};

