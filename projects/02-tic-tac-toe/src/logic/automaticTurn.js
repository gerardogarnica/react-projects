export const playAutomaticTurn = (availableSquares, updateBoard) => {
    const random = Math.floor(Math.random() * availableSquares.length)
    console.log(availableSquares[random])
    updateBoard(availableSquares[random])
}