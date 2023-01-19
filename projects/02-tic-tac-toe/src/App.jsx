import { useState } from 'react'

import { GAME_RESULT, GAME_TURNS } from './constants'
import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'
import { playAutomaticTurn } from './logic/automaticTurn'
import { checkIfGameIsOver, checkWinner } from './logic/board'
import { resetGameLocalStorage, saveGameToLocalStorage } from './logic/storage'

import './App.css'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [currentTurn, setTurn] = useState(() => {
    const currentTurnFromStorage = window.localStorage.getItem('currentTurn')
    return currentTurnFromStorage ?? GAME_TURNS.X
  })

  const [gameStatus, setGameStatus] = useState(GAME_RESULT.ongoing)

  const [availableSquares, setAvailableSquares] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8])

  const initValues = () => {
    setBoard(Array(9).fill(null))
    setTurn(GAME_TURNS.X)
    setGameStatus(GAME_RESULT.ongoing)

    resetGameLocalStorage()
  }

  const updateBoard = (index) => {
    // Ensure if exists a value or the game is finished
    if (board[index] || gameStatus != GAME_RESULT.ongoing) return

    // Set the value of the square
    const newBoard = [...board]
    newBoard[index] = currentTurn
    setBoard(newBoard)

    // Set the game turn
    const newGameTurn = currentTurn === GAME_TURNS.X ? GAME_TURNS.O : GAME_TURNS.X
    setTurn(newGameTurn)

    // Set the available squares
    const newAvailableSquares = [...availableSquares]
    newAvailableSquares.splice(newAvailableSquares.indexOf(index), 1)
    setAvailableSquares(newAvailableSquares)

    // Save into the local storage
    saveGameToLocalStorage({
      board: newBoard,
      currentTurn: newGameTurn
    })

    // Check if exists a winner
    const winner = checkWinner(newBoard)
    if (winner) {
      if (winner === GAME_TURNS.X) {
        setGameStatus(GAME_RESULT.xWinner)
      } else {
        setGameStatus(GAME_RESULT.oWinner)
      }
    } else if (checkIfGameIsOver(newBoard)) {
      setGameStatus(GAME_RESULT.tie)
    }

    // Play automatic turn
    console.log(newGameTurn)
    //if (newGameTurn === GAME_TURNS.O) playAutomaticTurn(newAvailableSquares, updateBoard)
  }

  return (
    <main className='board'>
      <h1>Tres en Raya</h1>
      <button onClick={initValues}>Reiniciar el juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}>
                  {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={currentTurn === GAME_TURNS.X}>
          {GAME_TURNS.X}
        </Square>
        <Square isSelected={currentTurn === GAME_TURNS.O}>
          {GAME_TURNS.O}
        </Square>
      </section>

      <WinnerModal gameStatus={gameStatus} resetGame={initValues} />
    </main>
  )
}

export default App