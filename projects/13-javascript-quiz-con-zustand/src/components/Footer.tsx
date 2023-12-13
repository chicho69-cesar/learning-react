import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/questions'
import useQuestionsData from '../hooks/use-questions-data'

export default function Footer() {
  const { correct, incorrect, unanswered } = useQuestionsData()
  /* Obtenemos una función de nuestro estado */
  const reset = useQuestionsStore((state) => state.reset)

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
      
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>
          Resetear juego
        </Button>
      </div>
    </footer>
  )
}
