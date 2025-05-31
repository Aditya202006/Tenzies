import React from "react"
import Die from "./Die"
import { nanoid } from 'nanoid'
import Confetti from "./Confetti"

export default function App() {
  
    const [dice,setDice] = React.useState(()=>generateAllNewDice())

    const buttonRef = React.useRef(null)
    
    const gameWon = (dice.every(die=>die.value) && dice.every(die=>die.isHeld))

    React.useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() =>({ value:Math.ceil(Math.random() * 6),
              isHeld : false,
              id : nanoid()
            }))
    }

    function rollDice(){
      if(!gameWon){
      setDice(dice=>dice.map(item=>
        item.isHeld ? item : {...item,value:Math.ceil(Math.random() * 6)}
      ))}
      else{
        setDice(generateAllNewDice())
      }
    }

    function hold(id){
      setDice(dice => dice.map(item=>
        item.id === id ?
        {...item,isHeld : !item.isHeld}
        :item
      ))
    }
    
    

    const die = dice.map(num=>(
      <Die key={num.id} value={num.value} isHeld={num.isHeld} hold={()=>hold(num.id)}/>
    ))


    return (<main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
       <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
          {die}
      </div>
      <button className="roll-dice" onClick={rollDice} ref={buttonRef} >{gameWon ? "New Game" : "Roll"}</button>
      
    </main>)
}