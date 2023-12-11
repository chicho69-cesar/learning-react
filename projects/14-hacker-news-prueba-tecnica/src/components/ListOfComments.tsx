import Comment from './Comment'

interface Props {
  ids: number[]
}

export default function ListOfComments({ ids }: Props) {
  return (
    <ul style={{ listStyle: 'none' }}>
      {ids?.map((id: number) => (
        <li key={id}>
          <Comment id={id} />
        </li>
      ))}
    </ul>
  )
}
