import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import { getBackgroundColor } from '../utils/background'
import type { Question as QuestionType } from '../types.d'
import { useQuestionsStore } from '../store/questions'

interface Props {
  info: QuestionType
}

export default function Question({ info }: Props) {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

  /* Hacemos uso de un clousure para crear una función que sirva como evento para el
  click de un button. */
  const handleClickCreate = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4, maxWidth: '100%' }}>
      <Typography variant='h5'>
        {info.question}
      </Typography>

      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={handleClickCreate(index)} // Hacemos uso de nuestro evento estilo clousure
              sx={{
                backgroundColor: getBackgroundColor(info, index)
              }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}
