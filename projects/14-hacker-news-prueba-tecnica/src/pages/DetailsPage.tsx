import { useEffect } from 'react'
import useSWR from 'swr'

import { getItemInfo } from '../services/hacker-news'
import ListOfComments from '../components/ListOfComments'

interface Props {
  params: {
    id: string
  }
}

type ResponseSWR = { kids: number[], title: string }

export default function DetailsPage({ params: { id } }: Props) {
  const { data, isLoading } = useSWR(`/story/${id}`, () => getItemInfo(Number(id)))

  const { kids, title }: ResponseSWR = data ?? {}
  const commentIds = kids?.slice(0, 10) ?? []

  useEffect(() => {
    document.title = `Hacker News - ${title}`
  }, [title])

  return (
    <div className=''>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ListOfComments ids={commentIds} />
      )}
    </div>
  )
}
