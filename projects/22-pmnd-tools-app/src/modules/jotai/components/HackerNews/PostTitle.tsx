import { useAtom } from 'jotai'
import Parser from 'html-react-parser'

import { css } from '../../../../../styled-system/css'
import { postData } from '../../store/hacker-news'

export default function PostTitle() {
  /* Resolvemos el atom postData */
  const [{ by, text, time, title, url }] = useAtom(postData)

  return (
    <>
      <h2 className={postBy}>{by}</h2>
      <h6 className={postDate}>{new Date(time * 1000).toLocaleDateString('en-US')}</h6>

      {title && <h4 className={postTitle}>{title}</h4>}
      {url && <a href={url} className={link}>{url}</a>}
      {text && <div className={parser}>{Parser(text)}</div>}
    </>
  )
}

const postBy = css({
  marginBottom: '0.2rem',
  fontSize: '1.5rem',
  color: 'white',
  fontWeight: 'bold'
})

const postDate = css({
  marginTop: '0',
  fontSize: '1rem',
  color: 'gray.200',
  fontStyle: 'italic'
})

const postTitle = css({
  fontWeight: '500',
  fontSize: '1.25rem',
  color: 'slate.900',
})

const link = css({
  color: 'gray.200',
})

const parser = css({
  position: 'absolute',
  color: 'gray.300',
  fontWeight: 'semibold'
})
