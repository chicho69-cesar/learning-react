import type { Comment, CommentWithId  } from '../types.d'

const API_KEY = import.meta.env.VITE_API_BIN_KEY
const API_URL = import.meta.env.VITE_API_URL

// const delay = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms))

export async function getComments(): Promise<CommentWithId[]> {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Key': API_KEY
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch the comments')
    }

    const json = await response.json()
    return json?.record
  } catch (error) {
    console.error(error)
    throw new Error('Failed to make the fetch')
  }
}

export async function postComment(comment: Comment) {
  const comments = await getComments()

  const id = window.crypto.randomUUID()
  const newComment: CommentWithId = { ...comment, id }
  const commentsToSave = [...comments, comment]

  try {
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Key': API_KEY
      },
      body: JSON.stringify(commentsToSave)
    })

    if (!response.ok) {
      throw new Error('Failed to post the comment')
    }

    return newComment
  } catch (error) {
    console.error(error)
    throw new Error('Failed to make the fetch')
  }
}
