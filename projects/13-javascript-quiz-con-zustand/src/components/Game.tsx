import { IconButton, Stack } from '@mui/material'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'

import Footer from './Footer'
import Question from './Question'
import { useQuestionsStore } from '../store/questions'

export default function Game() {
  /* Esto que sigue a continuación no es recomendado, por si obtenemos la información del
  estado haciendo destructuring, hacemos que este componente se suscriba a todo el estado
  y no solamente a lo que necesita */
  const { questions, currentQuestion, goNextQuestion, goPreviousQuestion } = useQuestionsStore((state) => state)
  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>

        {currentQuestion + 1} / {questions.length}

        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>

      <Question info={questionInfo} />
      <Footer />
    </>
  )
}
