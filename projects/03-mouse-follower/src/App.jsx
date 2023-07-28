import { useEffect, useState } from 'react'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  /* Cuando se ejecuta el effect:
  -> []: Solo se ejecuta una vez cuando se monta el componente
  -> [enabled]: Se ejecuta cuando se monta el componente y cuando enabled cambia
  -> undefined: Se ejecuta cada vez que se renderiza el componente
  */

  // pointer move - effect
  useEffect(() => {
    console.log('Effect: ', { enabled })

    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    /* Cuando se ejecuta la función cleanup:
    -> Cuando el componente se desmonta
    -> Cuando cambian las dependencias antes de ejecutar el effect de nuevo
    */
    return () => {
      console.log('Clean up')
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // change body className - Effect
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <>
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 153, 255, 0.8)',
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />

      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}

function App() {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
