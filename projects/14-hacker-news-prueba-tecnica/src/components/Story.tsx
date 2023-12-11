import useSWR from 'swr'
import { Link } from 'wouter'

import { getItemInfo } from '../services/hacker-news'
import { getRelativeTime } from '../utils/time'
import { storyLink, story, storyFooter, storyHeader, storyTitle } from './Story.css'
import StoryLoader from './StoryLoader'

interface Props {
  id: number
  index: number
}

export default function Story({ id, index }: Props) {
  const { data, isLoading } = useSWR(`/story/${id}`, () => getItemInfo(id))

  if (isLoading) {
    return <StoryLoader />
  }

  const { by, kids, score, title, url, time } = data

  let domain = ''
  try {
    domain = new URL(url).hostname.replace('www.', '')
  } catch {}

  const relativeTime = getRelativeTime(time)

  return (
    <article className={story}>
      <header className={storyHeader}>
        <small>{index + 1}.</small>
        <a
          className={storyTitle}
          href={url}
          target='_blank'
          rel='noopener noreferrer'
        >
          {title}
        </a>

        <a
          className={storyLink}
          href={url}
          target='_blank'
          rel='noopener noreferrer'
        >
          ({domain})
        </a>
      </header>

      <footer className={storyFooter}>
        <span>{score} points</span>

        <Link className={storyLink} href={`/article/${id}`}>
          by {by}
        </Link>
        
        <Link className={storyLink} href={`/article/${id}`}>
          <time dateTime={new Date(time * 1000).toISOString()}>
            {relativeTime}
          </time>
        </Link>

        <Link className={storyLink} href={`/article/${id}`}>
          {kids?.length ?? 0} comments
        </Link>
      </footer>
    </article>
  )
}
