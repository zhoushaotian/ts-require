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
