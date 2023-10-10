import { useState } from 'react'
import './App.css'

function App() {
  let [count, setCount] = useState(0);

  const increment = () =>{
    setCount(count + 1)
  }
  const reset = () =>{
    setCount(count = 0)
  }
  const decrement = () =>{
    if(count === 0){
      setCount(count = 0);
    }
    else{
      setCount(count - 1)
    }
  }

  return (
    <>
      <div className='container'>
      <h1>{count}</h1>
      <div className='btn'>
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
      <button onClick={decrement}>Decrement</button>
      </div>
      </div>
    </>
  )
}

export default App
