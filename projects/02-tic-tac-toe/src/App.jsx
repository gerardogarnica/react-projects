import { useEffect, useState } from 'react'

import { GAME_RESULT, GAME_TURNS } from './constants'
import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'
import { checkIfGameIsOver, checkWinner } from './logic/board'
import { sleep } from './logic/sleepTime'
import { resetGameLocalStorage, saveGameToLocalStorage } from './logic/storage'

import './App.css'

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [isComputerTurn, setIsComputerTurn] = useState(false)

  const [currentTurn, setTurn] = useState(() => {
    const currentTurnFromStorage = window.localStorage.getItem('currentTurn')
    return currentTurnFromStorage ?? GAME_TURNS.X
  })

  const [gameStatus, setGameStatus] = useState(GAME_RESULT.ongoing)

  const [availableSquares, setAvailableSquares] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8])

  useEffect(() => {
    // Ensure if the game is finished
    if (gameStatus !== GAME_RESULT.ongoing) return

    if (isComputerTurn) {
      playComputerMove()
    }
  }, [isComputerTurn])

  const initValues = () => {
    setBoard(Array(9).fill(null))
    setIsComputerTurn(false)
    setTurn(GAME_TURNS.X)
    setGameStatus(GAME_RESULT.ongoing)
    setAvailableSquares([0, 1, 2, 3, 4, 5, 6, 7, 8])

    resetGameLocalStorage()
  }

  const playHumanMove = (index) => {
    // Ensure if exists a value or the game is finished
    if (board[index] || gameStatus !== GAME_RESULT.ongoing) return

    // In case if the computer is playing, set the flag to false
    if (isComputerTurn) return

    // Update the board
    changeBoard(index)

    // Change the turn to the computer
    setIsComputerTurn(true)
  }

  const playComputerMove = async () => {
    // Ensure if the game is finished
    if (gameStatus !== GAME_RESULT.ongoing) return

    await sleep(500)

    // Update the board
    const random = Math.floor(Math.random() * availableSquares.length)
    changeBoard(availableSquares[random])

    // Change the turn to the computer
    await sleep(500)
    setIsComputerTurn(false)
  }

  const changeBoard = (index) => {
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

    // Check if exists a winner
    checkIfExistsWinner(newBoard)
  }

  const checkIfExistsWinner = (newBoard) => {
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
  }

  useEffect(() => {
    // Save into the local storage
    saveGameToLocalStorage({
      board: board,
      currentTurn: currentTurn
    })
  }, [currentTurn], [board])

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
                playMove={playHumanMove}
              >
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
