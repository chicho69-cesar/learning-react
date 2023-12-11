import useSWR from 'swr'

import { getItemInfo } from '../services/hacker-news'
import { getRelativeTime } from '../utils/time'
import CommentLoader from './CommentLoader'
import ListOfComments from './ListOfComments'

interface Props {
  id: number
}

export default function Comment({ id }: Props) {
  const { data, isLoading } = useSWR(`/comment/${id}`, () => getItemInfo(id))

  if (isLoading) {
    return <CommentLoader />
  }

  const { by, text, time, kids } = data
  const relativeTime = getRelativeTime(time)

  return (
    <>
      <details open>
        <summary>
          <small>
            <span>{by}</span>
            <span>·</span>
            <span>{relativeTime}</span>
          </small>
        </summary>

        <p>{text}</p>
      </details>

      {kids?.length > 0 && <ListOfComments ids={kids.slice(0, 10)} />}
    </>
  )
}
