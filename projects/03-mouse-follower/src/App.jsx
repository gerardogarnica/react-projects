import { useEffect, useState } from 'react'

const FollowMouse = () => {
  const [mouseEnabled, setMouseEnabled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log('effect ->', { mouseEnabled })

    const handleMove = (event) => {
      const { clientX, clientY } = event
      setMousePosition({ x: clientX, y: clientY })
    }

    if (mouseEnabled) {
      console.log('subscribe')
      window.addEventListener('pointermove', handleMove)
    }

    return () => {
      console.log('cleanup')
      window.removeEventListener('pointermove', handleMove)
    }
  }, [mouseEnabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
      }}
      />
      <button onClick={() => setMouseEnabled(!mouseEnabled)}>
        {mouseEnabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}

function App () {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
