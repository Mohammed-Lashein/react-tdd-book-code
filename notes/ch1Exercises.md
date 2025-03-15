# Here I document the questions I had along with their answers on solving ch1 exercises

**In `reactTestExtensions.js` file, how are we using
the `document.createElement()` to create an element even though we
are not in the browser ?**

=> Since we have configured jest to use jsdom, we don't need to
manually instantiate an instance of it and use it .   
Jest will use it directly on running tests . 

___
**stripTerminalColor**
This fn is present in the tests for both matchers we added to
jest, however it has some hard code to understand : 
```js
const stripTerminalColor = (text) =>
    text.replace(/\x1B\[\d+m/g, "");
```

I asked chat and here is the simple explanation: 
- Jest usually prints the output of tests along with some helpful info to the terminal in a specific format
- to be able to make our matches correctly (to test the matchers) we need to filter the *additives* that jest usually adds to format code . 

Regex explanation : 
- \x1B : ANSI escape code (ESC) begins with this character (A sidenote, ANSI is a superset containing ASCII)
- \ [: matches the literal [ character (from what I understand, it simply means a start for other sequences to follow ... not sure and don't bother with these details)
- \d+ : Matches one or more digits
  - In ANSI, these specify the styles . Examples : 
    - 31 for red text
    - 1 for bold
- m : matches the literal m, which signals the end of an ANSI escape sequence 
  

___
**What is the need to use `printExpected` and `printReceived`** ?  
If you [inspect the source code in jest-matchers-utils repo](https://github.com/jestjs/jest/blob/HEAD/packages/jest-matcher-utils/src/index.ts), you will find that simply the previous 2 functions are a wrapper for `chalk.green` and `chalk.red`respectively 

___

Since we were using `className` property intensively, I wondered if this property can be used as both a getter and a setter (OOP terminology here), I found that yes we can use it for both . 

Then I wondered what will using `classList` property on `Element` interface print, here is some code : 
```js
 const el = document.createElement('div')
  el.className = 'foo bar'
  console.log(el.className); // The string :  foo bar 
  console.log(el.classList.value); // The string :  foo bar 
  /* DOMTokenList, a weird data structure 
  */
  console.log(el.classList); // ['foo', 'bar', value: 'foo bar']
  /* I thought I just had a normal object in the console, so I tried to log that too, but the output was not with the same structure */
  console.log([1,2, {pudding: 'choco'}]); // [1, 2, {…}]
```

It was a bit weird to see a data structure similar to php arrays (where using named indexes in an array is totally normal), but it seems that DOMTokenList provides this utility !
___
**Regarding `sourceHint` and `actualTextHint` functions :**  
It is important that you return the values from them (In the book, the writer didn't do that) otherwise the error messages won't appear . 

~~Also, I found that `printExpected` and `printReceived` removal was not necessary, since that the output was printed colored even without them (just using the `matcherHint` function)~~

If we didn't use neither `printExpected` nor `printReceived`, we will get the output of our test (if it failed) as 
>Expected substring: "expect(element).toHaveClass(\"yay\")"
>Received string:    "expect(element).toHaveClass(yay)·"

instead of both values being a string (In the code they are both strings, but on logging to the terminal `yay` was not wrapped in quotes, which caused text mismatch resulting in test failure)

I personally don't understand the behavior myself, so just stick to jest utils to get everything in correct place . 
