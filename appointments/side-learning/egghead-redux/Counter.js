export const Counter = ({value, onIncrement, onDecrement}) => {  
  return (
    <>
  <div>{value}</div>
  <button onClick={onIncrement}>+</button>
  <button onClick={onDecrement}>-</button>
  </>
  )
}