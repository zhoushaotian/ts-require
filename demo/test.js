'use strict';
const path = require('path');
const tsRequire = require('../index');
tsRequire(path.resolve(__dirname, './hello.ts'), {
    delTemp: true
}).then(content => global.console.log(content));