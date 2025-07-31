This is the 1st time I know that html forms have `elements` property on them which allows us to access the elements within the form from either their `name` or `id` attributes . 

[I wrote a post about a data structure similar to that returned by `elements` property](https://www.linkedin.com/feed/update/urn:li:activity:7306986122742501377?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD3bEekBlC1nsY33KuOk5ikw8548pMCHqPc) .  
[I also found some notes about it on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements)
___

Taken this excerpt from page 66 in the book :  
>It's worth pointing out here that, if we hadn't extracted the three expectations into this function, we could have called this new function three times, rather than calling it once and saving that value in a variable. I probably wouldn't do this in my production code, but it's fine in tests; readability is more important than minimizing computation:  

The function we are speaking about is `firstNameField` .   

I don't understand what he means by that .   
=> After asking chat, he clarified :  
> The writer is saying they wouldn't repeatedly call the firstNameField() function in production code but are fine doing so in tests.  
> Why ? Because calling the fn multiple times in production will result in unnecessarily re-querying the DOM for an element that could have been stored in a variable 

___
How to dispatch an event on a DOM el even though event dispatching needs a browser to work ?  
=> [Use act().](https://react.dev/reference/react/act#dispatching-events-in-tests) And also, we downloaded `jsdom` so you have a fully functional `DOM` to interact with.
___
On testing state updates, you SHOULD use RTL `fireEvent` instead of the browser's native `dispatchEvent` . Why ?  
=> Because on using the browser's native `dispatchEvent`, the DOM updates aren't reflected to the DOM since react was not triggered by that . 

Use RTL `fireEvent` instead and avoid re-inventing the wheel .   

But I used the browser's native `submit()` on the form and it worked .  
=> This is true, but at some point you will be forced to use RTL instead . 
____

Some weird scenario I encountered:   

Given this `CustomerForm` component (which is different from the code present on github with the accompanying repo because at that time, I didn't modify the code to match that present in the repo):
```js
export function CustomerForm({ first_name, onSubmit, last_name }) {
  const [customer, setCustomer] = useState({ first_name, last_name })
  function handleTextInputChange(e, inputName) {
    setCustomer({
      ...customer,
      [inputName]: e.target.value,
    })
  }
  return (
    <form
      id='customer'
      onSubmit={() => {
        console.log("From CustomerForm component first_name value : ")
        console.log(customer.first_name)

        onSubmit(customer)
      }}
    >
      <label htmlFor='first_name'>First Name :</label>
      <input
        type='text'
        name='first_name'
        value={customer.first_name}
        id='first_name'
        onChange={(e) => handleTextInputChange(e, e.target.id)}
      />
    </form>
  )
}
```

On running this test:
```js
const form = (id) => container.querySelector(`form[id=${id}]`)
it('renders a form', async () => {
  await act(async () => {
    render(<CustomerForm />)
  })
  expect(form('customer')).not.toBeNull()
})
```
Everything worked.

Now notice this change in the `CustomerForm` component
```js
// collect all the passed props in 'original' object
export function CustomerForm({original, onSubmit}) {
  const [customer, setCustomer] = useState(original)
}
// going deep down...
<label htmlFor='first_name'>First Name :</label>
      <input
        type='text'
        name='first_name'
        value={customer.first_name} // watch this line
      />
```
On running the test, I get an error `TypeError: Cannot read properties of undefined (reading 'first_name')`.

After careful inspection, I found the gotcha!

In the 1st case, here is the value that the `customer` object  had when we passed nothing to `CustomerForm`:
```js
 {
  // We used ES6 shorthand property names
  // first_name: first_name

  // WRONG! The property name is not evaluated on creating a property ❌
  // undefined: undefined

  // ✅ 
  first_name: undefined,
  last_name: undefined,
}
```
So when `customer.first_name` was executed, it was **valid** js because we had a property key ~~`undefined`~~ `first_name` whose value was `undefined`.

**But where did `undefined` come from?**  
=> Any destructured prop that was not passed to a react component will have the value of `undefined`.

But in the 2nd case, the `customer` object was passed:  
```js
const original = undefined
```
So in our `input` field, ~~we were trying to access `undefined.undefined` which is invalid because `undefined` itself doesn't have a property called `undefined`.~~
we were trying to access `undefined.first_name` which is invalid because `undefined` itself doesn't have a property called `first_name`.

After reviewing the writer's code, he mitigated this problem by passing `blankCustomer` to the `CustomerForm` component when the component needn't get any real values.
```js

  it("renders a form", () => {
    const blankCustomer = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    };

    render(<CustomerForm original={blankCustomer} />);

    expect(form()).not.toBeNull();
  });
```

**What is the solution then?**  
=> We can give a default value for `original` prop when no customer data is passed to the component. I like this approach because it encapsulates the data that the `CustomerForm` needs within it instead of being forced to pass `blankCustomer` every time we need to render `CustomerForm` with no real data.
```js
export function CustomerForm({  
    original = {
      first_name: '',
      last_name: '',
      phone_number: '',
    }, 
    onSubmit  
  }) {
  }
```
____
**Why running either `npm test` or `npm run test` works? Isn't the 2nd one supposed to be the only version to work?**  

=> You can use any of them and they will work. `npm test` is just an alias for `npm run test`.
I searched the docs but couldn't find an explicit mention for that, but chat told me that info and I tried it myself and it worked!
____
### Prettier and `ASI`
Given the following block of code:
```js
  beforeEach(() => {
    ;({ render, container } = createContainer())
  })
```
I thought I added a `;` by mistake, so I removed it and called it a day.
But after saving the file, I found that prettier re-inserted it!

After asking chat and [tinkering in prettier docs](https://prettier.io/docs/rationale#semicolons), I found that it is added deliberately.

The docs has a good rationale behind adding that extra `;`, so I will leave you with their examples.
___
### webpack and `dist` directory
After running `npm run build` a couple of times, I noticed that the contents of the `dist` dir are not re-created from scratch as I am used to in vite.  
After asking chat, he told me that this is the **default behavior** in webpack. We can modify it by: 
```js
// webpack.config.js
module.exports = {
  output: {
    clean: true, // This is equivalent to using CleanWebpackPlugin
  }
}
```
Also, we can configure vite to stop its default behavior of recreating `dist` dir from scratch using:
```js
// vite.config.ts
export default defineConfig({
  build: {
    emptyOutDir: false,
  }
});
```
I haven't personally used these options yet(I am happy that webpack doesn't wipe everything in `dist`). I am keeping it here just for reference.
____
### Regarding `tailwind` and `webpack` configurations
I wrote my thoughts in a [notion page](https://www.notion.so/Adding-tailwind-in-a-project-using-webpack-The-definitive-guide-23fd06181235809dac4eeeaf39621956?source=copy_link) that you can view.
____
### Regarding `form.elements` and `HTMLFormControlsCollection`

So in page 81 (on the paper) in the book, it is shown that we can access form elements through the `elements` property on the form.

And if the elements in the form have names, we can access them through `form.elements[nameGivenToTheElement]`

The `HTMLFormControlsCollection` data structure (or interface to be [more conformant with the docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormControlsCollection)) is also a `NodeList` that updates its elements live.

Given this DOM structure:
```html
  <form>
    <select name='bananaPudding'></select>
    <input/>
    <input name='hi-hello'/>
  </form>
```
Here is how you can access the elements in this form
```js
  const form = document.querySelector('form')
  console.log(form.elements)
  /* 
    [select, input, input, "bananaPudding:" select," hi-hello": select]

    This data structure is more apparent in the browser, but you will see that we get an array similar
    to php arrays, where we have keys as both numbers and text
  */
```
____
### Regarding `select` element having one `option`
In the given test (from page 82 on paper):
```js
 it("initially has a blank value chosen", async () => {
    await render(<AppointmentForm />)

    const firstNode = field('service').children[0]
    
    expect(firstNode.value).toBe('')
    expect(firstNode.selected).toBeFalsy()
  })
```
I intentionally wanted to see `firstNode.selected` returning `false`, so I modified my `jsx`:
```js
 <select name="service" id="">
    <option value="" selected={false}></option>
  </select>
```
The big gotcha: The test **was failing** even though I am explicitly saying that I **don't want** this option to be selected!   

So I went to [read in the docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select) and found this line:  
>Each `<option>` element should have a value attribute containing the data value to submit to the server
when that option is selected. If no `value` attribute is included, the value defaults to the text contained
inside the element. You can include a `selected` attribute on an `<option>` element to make it selected by
default when the page first loads. If no `selected` attribute is specified, the first `<option>` element
will be selected by default.

That's why my test was always failing. If you don't have a `selected` attribute on an `option` in a `select`
element, the browser will select the 1st option by default.
___
### `expect.arrayContaining`

This jest matcher ensures whether the received array contains all elements specified in the expected array.
Take this good example from google gemini:
```js
test('should contain important values in array', () => {
  const receivedArray = ['apple', 'banana', 'orange', 'grape'];
  const expectedSubset = ['banana', 'grape'];

  expect(receivedArray).toEqual(expect.arrayContaining(expectedSubset));
});
```
The test doesn't fail when the `receivedArray` contains elements that are not present in the `expectedSubset`.

And to be fair, [jest docs](https://jestjs.io/docs/expect#expectarraycontainingarray) has a better example than the one provided by gemini.

We have encountered this situation in a test in `AppointmentForm.test.js`:
```js
  it("lists all salon services", async () => {
    const services = ['service1', 'service2']
    await render(<AppointmentForm services={services}/>)

    const optionNodes = Array.from(field('service').children)
    const renderedServices = optionNodes.map((node) => node.textContent)

    /* 
      renderedServices = ["", 'service1', 'service2']; // the 1st blank el is due to the 1st option in
      // the select element having an empty value
    */
    expect(renderedServices).toEqual(expect.arrayContaining(services))
  })

```
____
### `AppointmentForm` component props
At the beginning of the test suites for `AppointmentForm` component, we didn't pass any props. But later we introduced the `services` prop, which will make the 1st tests fail.  
**Why?**  
=> Because we will be mapping on a props that don't exist, resulting in the famous error in react projects 
`Cannot read properties of undefined (reading 'map')`.  
So, it is important to always provide default values for expected props in case they are not passed in a test.
