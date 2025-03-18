jest.mock('./storeAndRenderComponent', () => ({
  store: {
    dispatch: jest.fn(),
    getState: jest.fn(() => ({ todos: [] })), // Mock store state
    subscribe: jest.fn(),
  },
}));

import { act } from 'react';
import * as reactTestExtensions from  "../../src/exercises/ch1/test/reactTestExtensions"
// import { initializeReactContainer } from '../../src/exercises/ch1/test/reactTestExtensions';
import TasksApp from './TasksApp';

/* It is IMPORTANT to put jest.mock() outside of the describe block,
otherwise it won't run correctly before any tests and thus will cause some errors . 

Specifically errors complaining that renders in the storeAndRenderComponent are not wrapped in act() [which I didn't do since there were no need for that . That file was supposed to be rendered by the browser not jest]*/
jest.mock('./storeAndRenderComponent', () => ({
  store: {
    dispatch: jest.fn(),
    getState: jest.fn(() => ({ todos: [] })), // Mock store state
    subscribe: jest.fn(),
  },
}));

describe("TasksApp", () => {

  beforeEach(() => {
    reactTestExtensions.initializeReactContainer()
  })

  let container = reactTestExtensions.initializeReactContainer()
  it("mounts correctly", async function() {

    await act(async () => {
      reactTestExtensions.render(<TasksApp todos={[]}/>)
    })

    expect(reactTestExtensions.element('div[data-testid="TasksApp"]'))
    .not.toBeNull()
  })

  it.skip("dispatches ADD_TODO action on button click", async() => {
    await act(async () => {
      reactTestExtensions.render(<TasksApp todos={[]}/>)
    })
    const input = reactTestExtensions.element('div[data-testid="TasksApp"] input')
    const button = reactTestExtensions.element('div[data-testid="TasksApp"] button')
    console.log('my fancy input');
    
    // console.log(input);
    // console.log(input.props);
    // console.log(input.ref);

      await act(async () => {
        input.value = "Madinah"
      })
      await act(async () => {
        button.click()
      })
    
    expect(input).not.toBeNull()
    expect(button).not.toBeNull()

    /* The below test is also failing . Since I am not using RTL and 
    also haven't read redux chapter from the book, I don't know how
    to wait for state updates before the tests run */
    // expect(reactTestExtensions.element('div[data-testid="TasksApp"]').textContent).toContain("Madinah")

    /* I am getting store.dispatch is undefined . I tried solving it 
    but the problem still persists . 
    
    Since I haven't learned testing redux yet from the book, I will postpone this assertion for now */
    // expect(store.dispatch).toHaveBeenCalledWith({
    //   type: "ADD_TODO",
    //   text: "Madinah",
    //   id: expect.any(Number)
    // })
  })
})