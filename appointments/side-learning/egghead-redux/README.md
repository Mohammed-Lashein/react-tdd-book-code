## Here I write my notes about the course 

- Actions are usually strings because they are serializable

Pure functions : 
1. Same input, same output
2. Don't mutate data passed to them but instead create a new data structure (not mutating an array in place but returning another copy of it)

Reducers : 
1. They are the state mutators in our app
2. They should be pure functions
3. On changing a part of the state, we don't need to copy the full state again, we can keep reference to the unchanged parts (I don't know how yet)

Some useful links : 
- [using refs (the callback pattern and the createRef fn from react)](https://legacy.reactjs.org/docs/refs-and-the-dom.html)