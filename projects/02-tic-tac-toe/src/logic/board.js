import { WINNER_COMBINATION } from '../constants'

export const checkWinner = (boardToCheck) => {
  for (const combination of WINNER_COMBINATION) {
    const [a, b, c] = combination

    if (boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]) {
      return boardToCheck[a]
    }
  }

  return null
}

export const checkIfGameIsOver = (boardToCheck) => {
  return boardToCheck.every((square) => square != null)
}
