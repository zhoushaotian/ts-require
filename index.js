'use strict';
const path = require('path');
// const childProess = require('child_process');
const deasync = require('deasync');

// const tsc = path.join(path.dirname(require.resolve('typescript')), './tsc.js');
// const tool = require('./utils/tool');
// const fs = require('fs-extra');

const exec = require('./utils/exec');

const defaultOptions = {
    target: 'es6',
    module: 'commonjs',
    tmpDir: path.join(process.cwd(), 'tmp'),
    delTemp: false,
};

function asyncRequire(filePath, opt, cb) {
    try{
        exec(opt.execType, filePath, opt).then((result) => {
            cb(null, result);
        }).catch((e) => {
            cb(e);
        });
        // const child = childProess.fork(tsc, [filePath].concat(tool.convertOpt(opt)));
        // child.on('exit', () => {
        //     delete require.cache[path.join(opt.tmpDir, path.basename(filePath, '.ts') + '.js')];
        //     const content = require(path.join(opt.tmpDir, path.basename(filePath, '.ts') + '.js'));
        //     if(opt.delTemp) {
        //         fs.removeSync(opt.tmpDir);
        //     }
        //     cb(null, content);
        // });
    }catch(e) {
    /* istanbul ignore next */
        cb(e);
    }
}

module.exports = function(opt = {}) {
    opt = Object.assign({}, defaultOptions, opt);
    return deasync(function(filePath) {
        const args = Array.prototype.slice.call(arguments);
        const cb = args[args.length - 1];
        asyncRequire(filePath, opt, cb);
    });
};

