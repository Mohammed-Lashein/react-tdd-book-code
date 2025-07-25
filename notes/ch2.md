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