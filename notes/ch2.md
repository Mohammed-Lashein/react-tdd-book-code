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
