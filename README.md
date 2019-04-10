# ts-require
require a ts file in js file
## usage
for example: we have a ts file like this
```ts
// demo.ts
export const word = 'hello world!'
export function say() {
    return word
}
```
in our js file we can require
```js
const tsRequire = require('ts-require');
const demo = tsRequire('./demo.ts');
// then we can use this module
demo.say();
demo.word // hello world
```