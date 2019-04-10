'use strict';
exports.convertOpt = function (opts) {
    return [
        '-t',
        opts.target,
        '-m',
        opts.module,
        '--outDir',
        opts.tmpDir,
    ];
};
