export const saveGameToLocalStorage = ({ board, currentTurn }) => {
    // Saving current game status
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('currentTurn', currentTurn)
}

export const resetGameLocalStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('currentTurn')
}