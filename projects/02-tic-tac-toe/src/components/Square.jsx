export function Square ({ children, index, isSelected, playMove }) {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    playMove(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}
