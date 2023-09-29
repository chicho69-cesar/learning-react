import { Suspense } from 'react'
import { Provider } from 'jotai'

import { css } from '../../../../styled-system/css'
import Id from '../components/HackerNews/Id'
import PostTitle from '../components/HackerNews/PostTitle'
import Next from '../components/HackerNews/Next'

export default function HackerNewsExample() {
  return (
    <div className={container}>
      <Provider>
        <div className={grid}>
          <Id />

          <div className={postContainer}>
            <Suspense fallback={<div>Loading...</div>}>
              <PostTitle />
            </Suspense>
          </div>

          <Next />
        </div>
      </Provider>
    </div>
  )
}

const container = css({
  minH: '100vh',
  backgroundColor: 'slate.600',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

const grid = css({
  display: 'grid',
  width: '2/3',
  gridTemplateColumns: 'auto 1fr auto'
})

const postContainer = css({
  padding: '20px 0px',
  overflowY: 'scroll',
  wordWrap: 'break-word',
  position: 'relative',

  '&::-webkit-scrollbar': {
    width: '2px',
    backgroundColor: 'transparent'
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'white'
  }
})
