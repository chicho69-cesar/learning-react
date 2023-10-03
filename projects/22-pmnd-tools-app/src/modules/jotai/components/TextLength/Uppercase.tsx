import { useAtom } from 'jotai'

import { css } from '../../../../../styled-system/css'
import { textUpperAtom } from '../../store/text-length'

export default function Uppercase() {
  /* Resolvemos el valor del atom textUpperAtom */
  const [uppercase] = useAtom(textUpperAtom)
  
  return (
    <h3 className={uppercaseText}>
      Uppercase: <span className={uppercaseStyle}>{uppercase}</span>
    </h3>
  )
}

const uppercaseText = css({
  fontSize: '1.5rem',
  fontWeight: 'semibold',
  color: 'gray.300'
})

const uppercaseStyle = css({
  fontSize: '1rem',
  fontWeight: 'bold',
  color: 'white'
})
