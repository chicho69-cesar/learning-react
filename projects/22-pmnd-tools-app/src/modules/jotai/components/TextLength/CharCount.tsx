import { useAtom } from 'jotai'

import { css } from '../../../../../styled-system/css'
import { textLenAtom } from '../../store/text-length'

export default function CharCount() {
  /* Obtenemos el valor del estado del atom textLenAtom */
  const [len] = useAtom(textLenAtom)

  return (
    <h3 className={charCount}>
      Length: <span className={lengthStyle}>{len}</span>
    </h3>
  )
}

const charCount = css({
  fontSize: '1.5rem',
  fontWeight: 'semibold',
  color: 'gray.300'
})

const lengthStyle = css({
  fontSize: '1.75rem',
  fontWeight: 'bold',
  color: 'white'
})
