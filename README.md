# ts-require
require a ts file in js file
[![Build Status](https://travis-ci.org/zhoushaotian/ts-require.svg?branch=master)](https://travis-ci.org/zhoushaotian/ts-require)
## usage
for example: we have a ts file like this
```ts
// demo.ts
export const word = 'hello world!'
export function say() {
    return word
}
```
in our js file we can require use resolve path
```js
const tsRequire = require('ts-require')();

// this will generate tmp dir in your project
cosnt data = tsRequire(path.resolve(__dirname, './demo.ts'))
// then we can use this module
data.say();
data.word;// hello world

// if you want to del it you can pass delTmp true to it
const tsRequireWithDel = require('ts-require')({
    delTemp: true
})
cosnt data = tsRequire(path.resolve(__dirname, './demo.ts'))
// then we can use this module
data.say();
data.word;// hello world
```

## options  
  
optionName|type|des|default  
----|----|----|---- 
target | string | 对应tsc的target选项(当execType为非eval才有效) | es6  
module | string | 对应tsc的module选项(当execType为非eval才有效)  | commonjs  
tmpDir | string | 临时文件夹目录地址(当execType为非eval才有效) | path.join(process.cwd(), 'tmp')  
delTemp | boolean | 是否删除临时文件夹(当execType为非eval才有效) | false  
execType | string | 编译模式(1.eval [ 速度最快 ] 2.exec 3.fork) | fork  
project | string | tsconfig.json的地址(当execType为eval才有效) | 无  

