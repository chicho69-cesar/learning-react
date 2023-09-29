import { useSetAtom } from 'jotai'

import { css } from '../../../../../styled-system/css'
import { postId } from '../../store/hacker-news'

export default function Next() {
  const setPostId = useSetAtom(postId)

  return (
    <button
      className={button}
      onClick={() => setPostId((id) => id + 1)}
    >
      <div>→</div>
    </button>
  )
}

const button = css({
  textDecoration: 'none',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'sans-serif',
  fontWeight: '200',
  fontSize: '6rem',
  padding: '0px 30px 20px 10px',
  display: 'flex',
  alignItems: 'flex-end',
  color: 'slate.900',
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    scale: '1.05'
  }
})
