import { useSnapshot } from 'valtio'

import { css } from '../../../../styled-system/css'
import { removeTodo, store, toggleDone } from '../store/todos'
import Countdown from './Countdown'

export default function Todos() {
  /* Accedemos al valor del estado usando useSnapshot */
  const snap = useSnapshot(store)

  return (
    <ul>
      {
        snap.todos
          .filter(({ status }) => status === snap.filter || snap.filter === 'all')
          .map(({ id, description, status }, index) => (
            <li key={id}>
              <span
                data-status={status}
                className={descriptionStyle}
                onClick={() => toggleDone(index, status)}
              >
                {description}
              </span>

              {status === 'overdue' && (
                <span className={overdueMessage}>
                  overdue{' '}
                  <span role='img' aria-label='pen'>
                    ⏱️
                  </span>
                </span>
              )}

              {status === 'pending' && (
                <Countdown index={index} />
              )}

              <button
                className={remove}
                onClick={() => removeTodo(index)}
              >
                ❌
              </button>
            </li>
          ))
      }
    </ul>
  )
}

const remove = css({
  padding: '4px',
  lineHeight: '1.1',
  marginLeft: '8px',
  zIndex: '1',
  backgroundColor: 'slate.800',
  shadow: 'md',
  rounded: 'sm',
  cursor: 'pointer',
  fontSize: '1rem'
})

const descriptionStyle = css({
  marginRight: '18px',
  width: '100%',
  color: 'white',

  '&:hover': {
    cursor: 'pointer',
  },

  '&[data-status="completed"]': {
    textDecoration: 'line-through'
  }
})

const overdueMessage = css({
  fontSize: '1rem',
  fontWeight: 'semibold',
  color: 'yellow.400'
})
