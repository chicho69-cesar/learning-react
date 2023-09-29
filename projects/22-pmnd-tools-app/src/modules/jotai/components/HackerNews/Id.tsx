import { a, useSpring } from '@react-spring/web'
import { useAtom } from 'jotai'

import { css } from '../../../../../styled-system/css'
import { postId } from '../../store/hacker-news'

export default function Id() {
  const [id] = useAtom(postId)

  const props = useSpring({
    from: { id },
    id,
    reset: true,
  })

  return (
    <a.h1 className={mainTitle}>
      {props.id.to(Math.round)}
    </a.h1>
  )
}

const mainTitle = css({
  writingMode: 'tb-rl',
  fontVariantNumeric: 'tabular-nums',
  fontWeight: '700',
  fontSize: '10rem',
  letterSpacing: '-10px',
  textAlign: 'left',
  margin: '0',
  padding: '30px 0px 0px 10px',
  color: 'slate.900'
})
