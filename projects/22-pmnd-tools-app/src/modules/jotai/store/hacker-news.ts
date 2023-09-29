import { atom } from 'jotai'
import type { PostData } from '../types/hacker-news.d'

export const postId = atom<number>(9001)
export const postData = atom(async (get) => {
  const id = get(postId)
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)

  const data: PostData = await response.json()
  return data
})
