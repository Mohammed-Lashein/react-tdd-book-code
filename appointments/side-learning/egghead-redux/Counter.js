export const Counter = ({value, onIncrement, onDecrement}) => {
  console.log('counter comp mounted !');
  
  return (
    <>
  <div>{value}</div>
  <button onClick={onIncrement}>+</button>
  <button onClick={onDecrement}>-</button>
  </>
  )
}