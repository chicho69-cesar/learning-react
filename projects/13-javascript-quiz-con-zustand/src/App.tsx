import './App.css'
import { Container, Stack, Typography, useTheme } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

import JavaScriptLogo from './components/JavaScriptLogo'
import Start from './components/Start'
import Game from './components/Game'
import Results from './components/Results'
import { useQuestionsStore } from './store/questions'
import useQuestionsData from './hooks/use-questions-data'

function App() {
  const questions = useQuestionsStore((state) => state.questions)
  const { unanswered } = useQuestionsData()
  const theme = useTheme()

  const medium = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <main>
      <Container maxWidth='sm'>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavaScriptLogo />

          <Typography variant={medium ? 'h2' : 'h5'} component='h1'>
            JavaScript Quiz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && unanswered > 0 && <Game />}
        {questions.length > 0 && unanswered === 0 && <Results />}

        <strong style={{ display: 'block', fontSize: '14px', marginTop: '48px' }}>
          Desarrollado con TypeScript + Zustand -{' '}
          <a style={{ color: 'yellow' }} href='https://github.com/chicho69-cesar/learning-react/tree/master/projects/13-javascript-quiz-con-zustand' target='_blank'>
            Ir al código
          </a>
        </strong>
      </Container>
    </main>
  )
}

export default App
