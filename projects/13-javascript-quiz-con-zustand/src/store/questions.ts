import type { Question } from '../types.d'

import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import confetti from 'canvas-confetti'

const API_URL = import.meta.env.PROD ? 'https://midu-react-13.surge.sh/' : 'http://localhost:5173/'

/* Creamos la interfaz que tendrá el estado */
interface State {
  loading: boolean
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}

/* Creamos el hook para manejar nuestro estado con create y lo tipamos. Si queremos
usar middlewares como en este ejemplo, debemos de ejecutar la llamada a la función create
y después ejecutar esta función con callbacks por cada middleware que queramos usar, en
este caso el middleware para usar las devtools y para hacer persistencia del estado */
export const useQuestionsStore = create<State>()(devtools(persist((set, get) => {
  /* Regresamos el valor del estado */
  return {
    loading: false,
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number) => {
      const res = await fetch(`${API_URL}/data.json`)
      const json = await res.json()

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions }, false, 'FETCH_QUESTIONS')
    },
    selectAnswer: (questionId: number, answerIndex: number) => {
      /* Obtenemos el valor de las questions del estado con la función get() */
      const { questions } = get()
      // Usamos el structuredClone para clonar el objeto
      const newQuestions = structuredClone(questions)
      // Encontramos el índice de la pregunta
      const questionIndex = newQuestions.findIndex((q) => q.id === questionId)
      // Obtenemos la información de la pregunta
      const questionInfo = newQuestions[questionIndex]
      // Averiguamos si el usuario ha seleccionado la respuesta correcta
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

      if (isCorrectUserAnswer) confetti()

      // Cambiamos esta información en la copia de la pregunta
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }

      /* Actualizamos el estado, le pasamos si es un reemplazo de todo el estado
      y además el nombre de la acción que se ha realizado, en este caso SELECT_ANSWER */
      set({ questions: newQuestions }, false, 'SELECT_ANSWER')
    },
    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion }, false, 'GO_NEXT_QUESTION')
      }
    },
    goPreviousQuestion: () => {
      const { currentQuestion } = get()
      const previousQuestion = currentQuestion - 1

      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion }, false, 'GO_PREVIOUS_QUESTION')
      }
    },
    reset: () => {
      set({ currentQuestion: 0, questions: [] }, false, 'RESET')
    }
  }
}, {
  /* Establecemos el nombre del elemento que se va a utilizar para persistir el estado,
  en este caso lo que se utiliza por defecto es el localstorage */
  name: 'questions'
})))
