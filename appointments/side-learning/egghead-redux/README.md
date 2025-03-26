## Here I write my notes about the course 

- Actions are usually strings because they are serializable

**Pure functions :**
1. Same input, same output
2. Don't mutate data passed to them but instead create a new data structure (not mutating an array in place but returning another copy of it)

**Reducers :** 
1. They are the state mutators in our app
2. They should be pure functions
3. On changing a part of the state, we don't need to copy the full state again, we can keep reference to the unchanged parts (I don't know how yet)

___

 **Regarding `Todo` component refactoring**
   1. passing an onClick handler is better than hardcoding it in the component (this makes the component more flexible)
   2. Instead of just passing a todo to the component, we pass explicitly the props that the component will need (I am a bit skeptic about this approach)  
  
After asking chat, he told me that this is a debate in the React community !  
He also told me that maybe the instructor did that (passing props explicitly) " for clarity and encapsulation, ensuring Todo doesn’t rely on a large data structure it doesn’t control" .

Some useful links : 
- [using refs (the callback pattern and the createRef fn from react)](https://legacy.reactjs.org/docs/refs-and-the-dom.html)

