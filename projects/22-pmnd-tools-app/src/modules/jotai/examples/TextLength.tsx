import { Provider } from 'jotai'

import { css } from '../../../../styled-system/css'
import Input from '../components/TextLength/Input'
import CharCount from '../components/TextLength/CharCount'
import Uppercase from '../components/TextLength/Uppercase'

export default function TextLengthExample() {
  return (
    <div className={container}>
      <div className={textLengthSection}>
        <Provider>
          <Input />
          <CharCount />
          <Uppercase />
        </Provider>
      </div>
    </div>
  )
}

const container = css({
  minH: '100vh',
  backgroundColor: 'slate.600',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const textLengthSection = css({
  width: '1/3',
  backgroundColor: 'slate.800',
  padding: '1rem',
  rounded: 'md',
  shadow: 'md',
})
