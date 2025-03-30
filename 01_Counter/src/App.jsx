import { useState } from 'react'
import './App.css'

function App() {

let  [counter,setcounter] = useState(20)  //..................using usestate we change all value in over state

// let counter = 20
 
const addvalue = () => {
  counter = counter + 1
  if(counter>20){
    counter = 20
  }
    setcounter(counter)
}

const removevalue = () => {
  counter = counter - 1
  if(counter<0){
    counter = 0
  }
    setcounter(counter)
}

  return (
    <>
      <h1>Chai ure code</h1>
      <h1>hello world: {counter}</h1>

      <button onClick={addvalue}>addd value</button><br/>  {/*  using onclick we call funcion and important ki when call funcion write only name because fuction call only butten */}
      <button onClick={removevalue}>remove value</button>
    </>
  )
}

export default App
