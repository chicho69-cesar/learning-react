type PostType = {
  title: string
  author: {
    name: string
    age: number
  },
  createdAt: Date
}

function Post({ post }: { post: PostType }) {
  return (
    <div>
      <PostTitle title={post.title} />
      <span>{post.author.name}</span>
      <PostData createdAt={post.createdAt} />
    </div>
  )
}

type TitleProps = {
  title: string
}

function PostTitle({ title }: TitleProps) {
  return <h1>{title}</h1>
}

type DataProps = {
  createdAt: Date
}

function PostData({ createdAt }: DataProps) {
  return <time>{createdAt.toISOString()}</time>
}

export default function InterfaceSegregation() {
  return (
    <Post
      post={{
        title: 'Curso de React',
        author: {
          name: 'Miguel Ángel Duran',
          age: 38,
        },
        createdAt: new Date(),
      }}
    />
  )
}
