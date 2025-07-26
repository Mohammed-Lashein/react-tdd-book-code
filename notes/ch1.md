**What is automated regression testing ?**  
=> Automated regression testing is a technique for ensuring that
new software upgrades do not break the functioning of an existing
software application. In addition to being extremely time
efficient, automated regression tests provide a thorough and
in-depth explanation of the failed test that has to be fixed.

[link to the article
explaining](https://www.perfecto.io/blog/automated-regression-testing#:~:text=Automated%20regression%20testing%20is%20a%20technique%20for%20ensuring%20that%20new,that%20has%20to%20be%20fixed.)

___
On using npm init and after inspecting the `package.json` file, I
found `"license": "ISC"` . What does that mean ?

ISC is short of (Internet Systems Consortium) .
It is as the MIT liscense .
It allows developers to freely use, modify, and distribute the
code with minimal restrictions.

___
The writer talked about setting the repository field or else npm
will complain every time we run a command . 
He also suggested setting `private` property to `true` . 

But in my case, the `package.json` doesn't have the `repository`
field, so I won't bother with it now . 
___

### Some babel stuff
- **@babel/preset-env** : Adds several presets instead of manually
  downloading each one

What are presets ?  
=> They act as sharable plugins that babel can use . 

- What does the below command do ?
```bash
npm install --save-dev @babel/plugin-transform-runtime
```

It adds the plugin `plugin-transform-runtime` . 
[From the
docs](https://babeljs.io/docs/babel-plugin-transform-runtime) : 
>A plugin that enables the re-use of Babel's injected helper code
>to save on code size.

- Another fancy babel command : 
```bash
 npm install --save @babel/runtime
```

The above plugin `plugin-transform-runtime` (as I understand)
redirects all of the imports of babel internals to the
`@babel/runtime` module, thus decreasing code duplication in the
bundle . 

[You can check the docs for more
info](https://babeljs.io/docs/babel-runtime)

- Why do we need .babelrc file ?  
=> To activate the plugins, you need to add them in this file  

- What about .babelrc (why is it named that way)?
[From the
docs](https://babeljs.io/docs/config-files#supported-file-extensions), 
>For compatibility reasons, .babelrc is an alias for
>.babelrc.json.

___
### Jest insights

- How are we able to use jest functions without importing them ?  
=> From the book, All of the Jest functions are already required
and available in the global namespace when you run the `npm
test`command. You don't need to import anything.

Another great advice from the same page (page 22) : 
> For React components, it's good practice to give your describe blocks the same name as the component itself.

___
### General tests naming convention notes
```js
describe("Appointment", () => {
  it('renders the customer 1st name', () => {
  })
})
```

- **it**: 
  1. defines a single test
  2. The 1st arg is is the description of the test and *always* starts with a **present-tense verb**,
  3. refers to the noun you named in your test suite (in this
    case, _Appointment_)

I have written a lot of tests not compliant to the 2nd note
because I didn't know it (mainly using pest in a php project I may
add a link to later) . I think it is time for refactoring ! 

The 3rd note is a very insightful one !

### Md notes 

How do you get a line break in your md file ?  
=> Just press `Enter` as you normally do in any text editor ❌  
=> **Add two spaces** before pressing `Enter` ✅

### Breaking changes to watch for

1. In page 24 in the book, the appeared error didn't complain
   about `document` because the `testEnvironment` was `jsdom` . 

However, [this is no longer the
case](https://jestjs.io/blog/2021/05/25/jest-27#flipping-defaults)
. You have to manually download `jsdom` as it is no longer shipped
with jest by default. 

An error message appeared to me pointing to that, and I found
[this article mentioning this issue](https://jestjs.io/blog/2021/05/25/jest-27#flipping-defaults) . 

Also, in jest github releases (release 28 as mentioned by the
error) message, they [mentioned
that](https://github.com/jestjs/jest/releases/tag/v28.0.0) . 

**Note:** You should download `jest-environment-jsdom` not just
`jsdom` (I made this mistake and was wondering why my code was
not working)

2. `ReactDOM.render()` is deprecated . Use `createRoot` instead .
___


### General notes
- It is better to use named exports so when you change the
  component's name, you get errors that will guide you where you
  should change the old name to the new one . 
Whereas on using default exports, you won't get any errors by
changing the components name .

Why changing the component's name is an issue ?  
=> The name change is not the issue, but as the writer says :  
> Once your names are out of sync, it can be hard to track where components are used.


- What is **triangulation** ?  
=> It means writing additional tests that cover test scenarios or
edge cases

___
### Tackling tests are not passing issue
I followed every line with the book and still the tests are not
passing .

Chat suggested these : 

react-test-renderer package: After searching, it helps us run
tests without needing jsdom .
How ?  
=> By transpiling the written jsx into js objects that
React.createElement() usually creates

**How will we tackle this problem then?**  
It seems that the tests are running before react element is
mounted to the DOM . 

Is there a way to make sure the tests are run after the element
mount to the DOM ?

Yes, [the act()
method](https://legacy.reactjs.org/docs/test-utils.html#act) . 

How does it work ?  
=> It makes sure that components have been rendered before making
any assertions . 

**But I get a deprecation warning on importing it in the IDE**  
=> Correct, [now you should import it from react package
instead](https://react.dev/warnings/react-dom-test-utils) .

Although in the docs they are recommending using RTL, I will
stick to the instructions of the writer because I have learnt
alot by following them . 

The name act() comes from [
Arrange-Act-Assert](http://wiki.c2.com/?ArrangeActAssert)
pattern.

**Now I am getting another error:**  
` The current testing environment is not configured to support
act(...)` .  
You need to set an env var in `jest.setup.js` (I created this
file as it was not present in my code) . 

[This article explains the problem and the solution](https://react.dev/reference/react/act)

___

#### Babel now is throwing an error saying that React is undefined . The error is thrown on returning from Appointment component 

Correct, after asking chat, he told me that it was due to babel
being unable to import React in the `Appointment.js` file . 

*But I am importing it in the test file ...*
That's right, but due to [configuration issues](https://babeljs.io/docs/babel-preset-react#options), babel can't
*automatically* import React to transpile the jsx in
`Appointment.js`

___

It was really hard time going through all of the above problems . 
But still we have 1 last problem  :

The error message that is displayed on running the tests :   
>[DEP0040] DeprecationWarning: The `punycode` module is
>deprecated. Please use a userland alternative instead.  

It took me some time to tackle this issue, and long story short,
ignore it !  
I think on using RTL you won't face it .  
But since we are using packages ourselves here, a package called
tr46 being used by a subpackage in jest-environment-jsdom is
using an older verion of it (v 3.0 instead of v 5.0) .  

How did I know that ?  
=> Chat suggested using `npm ls package-name` to know which other
packages are depending on that specific package .  

I spent some time to force every package to use the latest
version, but things are getting tedious and **I came here to learn
testing not solve package issues** .  

So I am keeping this problem as it is . 

___
### A note about refacotring 
>We're in the middle of a red test. We should never refactor,
>rework, or otherwise change course while we're red.  
>What we'll have to do is ignore, or pend, this test we're
>working on

Why can't we refactor while in red ?  
=> Following the [red-green-refactor
style](https://www.codecademy.com/article/tdd-red-green-refactor),
we need not to introduce any code changes while having red tests .
We should focus on either fixing or skipping them for now if we
wanted to change the tested code . 

___
I thought this chapter had enough surprises to introduce, but
seeing webpack at the end seems the writer has a different
opinion !  

What is babel-loader and why do we need it ?
Let's discuss roles here : 
1. Babel : Transpiles modern JS to old ones
2. Webpack : Bundles js files or assets in general
3. babel-loader : 
   1. A 3rd party package (not maintained by webpack but babel, as
      stated in babel docs)
   2. Enables webpack to bundle the assets transpiled by babel
   3. In other words, it is a bridge between babel and webpack

___
### Regarding ch1 exercises `unique` method in `exerciseSampleData.js`
Regarding the `unique` method present in `exerciseSampleData.js`, I think it needs some visualization to be understood.

Here is the code snippet to consider:
```js
Array.prototype.unique = function () {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
};
const stylists = [0, 1, 2, 3, 4, 5, 6]
  .map(() => faker.person.firstName())
  .unique();
```

Supose that:
```js
// an example output
const stylists = ['Alice', 'Bob', 'Charlie', 'Alice', 'David', 'Eve', 'Bob']
```

Iterations visualized:
```js
  // 1st iteration
  /* 
    self.indexOf('Alice') === 0   correct
  */
  // 2nd iteration
  /* 
    self.indexOf('Bob') === 1   correct
  */
  // 3rd iteration
  /* 
    self.indexOf('Charlie') === 2   correct
  */
  // 4th iteration
  /* 
    self.indexOf('Alice') === 3   False! the indexOf call will return 0 since this is the 1st 
    appearance of Alice
  */
  // 5th iteration
  /* 
    self.indexOf('David') === 4   correct
  */
  // 6th iteration
  /* 
    self.indexOf('Eve') === 5   correct
  */
  // 7th iteration
  /* 
    self.indexOf('Bob') === 6   False! Because Bob's 1st appearance is at index 1
  */
```