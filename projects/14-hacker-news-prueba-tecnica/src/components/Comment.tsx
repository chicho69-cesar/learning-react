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

  /* Si la query con swr esta cargando regresamos un loader para mejorar la experiencia
  del usuario. */
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
            <span> · </span>
            <span>{relativeTime}</span>
          </small>
        </summary>

        <p>
          <div dangerouslySetInnerHTML={{ __html: text }} />
          {/* {text} */}
        </p>
      </details>

      {/* El componente ListOfComments muestra en si otro componente
      Comment, por lo que seria como una llamada recursiva donde uno manda a uno
      y el otro manda a otro, por lo que se detiene la recursividad cuando en algún
      punto kids.length sea menor o igual a 0. */}
      {kids?.length > 0 && <ListOfComments ids={kids.slice(0, 10)} />}
    </>
  )
}
