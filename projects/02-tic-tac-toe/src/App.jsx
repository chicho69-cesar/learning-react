import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'
import { TURNS } from './constants'
import { checkEndGame, checkWinnerFrom } from './logic/board'
import { resetGameStorage, saveGameToStorage } from './logic/storage'

function App() {
  /* Cuando usamos el hook useState, podemos pasar le el valor inicial o 
  podemos pasar le un callback donde el valor que retorne sera el valor inicial
  del estado */
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  useEffect(() => {
    saveGameToStorage({
      board,
      turn,
    })
  }, [board, turn])

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    /* Si la posición ya tiene algo o ya hay ganador no la actualizamos */
    if (board[index] || winner) return

    /* Actualizamos el tablero: Esto lo debemos de hacer creando un objeto
    u arreglo totalmente nuevo y asignarlo al state, debido a que no es una
    buena practica mutar el estado directamente */
    const newBoard = [...board]
    newBoard[index] = turn // Hacemos el cambio en el arreglo creado a partir del state
    setBoard(newBoard)

    // Cambiamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Revisamos si hay ganador 
    /* Es fundamental que cuando hacemos un cambio en el state, si necesitamos
    el nuevo valor del mismo para hacer algún calculo, o ejecutar mas código
    lo hagamos con el valor que creamos para guardarlo en el state y no con el state
    directamente, ya que el cambio de estado es un proceso asíncrono y puede que
    cuando usemos el estado después de cambiarlo el valor que nos regrese no 
    sea el que esperamos debido a que aun no lo ha actualizado */
    const newWinner = checkWinnerFrom(newBoard)

    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // Hubo un empate
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>

      <section className="game">
        {board.map((square, index) => (
          <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
          >
            {square}
          </Square>
        ))}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
