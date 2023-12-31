import { atom } from 'jotai'
import type { PostData } from '../types/hacker-news.d'

/* Esta es la forma de tipar un atom, cuando este tiene valores primitivos */
export const postId = atom<number>(9001)
export const postData = atom(async (get) => {
  const id = get(postId)
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)

  /* Mediante el return de este tipo de dato PostData, el atom se tipa con inferencia */
  const data: PostData = await response.json()
  return data
})
