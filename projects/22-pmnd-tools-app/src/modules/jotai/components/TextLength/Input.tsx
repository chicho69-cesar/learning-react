import { useAtom } from 'jotai'

import { css } from '../../../../../styled-system/css'
import { textAtom } from '../../store/text-length'

export default function Input() {
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
