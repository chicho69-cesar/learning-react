import { useAtom } from 'jotai'

import { css } from '../../../../../styled-system/css'
import { textAtom } from '../../store/text-length'

export default function Input() {
  /* El hook useAtom nos regresa una tupla con dos valores, el primero
  es el valor del estado del atom y el segundo la función para actualizar
  el valor de dicho atom */
  const [text, setText] = useAtom(textAtom)

  return (
    <input
      type='text'
      value={text}
      placeholder='Type something...'
      className={input}
      onChange={(e) => setText(e.target.value)}
    />
  )
}

const input = css({
  width: '100%',
  outline: 'none',
  padding: '0.5rem 1rem',
  marginBottom: '1rem',
  border: 'none',
  rounded: 'sm',
})
