import { GAME_RESULT } from '../constants'

export function WinnerModal ({ gameStatus, resetGame }) {
  if (gameStatus === GAME_RESULT.ongoing) return null

  const resultText = gameStatus === GAME_RESULT.xWinner
    ? 'GANASTE! 😍'
    : gameStatus === GAME_RESULT.oWinner
      ? 'PERDISTE 😔'
      : 'EMPATE 😑'

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{resultText}</h2>

        <footer>
          <button onClick={resetGame}>Juega de nuevo</button>
        </footer>
      </div>
    </section>
  )
}
