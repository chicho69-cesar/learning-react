import { API_BASE_URL } from '../constants'

export async function fetcher(url: string) {
  const response = await fetch(`${API_BASE_URL}/${url}`)
  return await response.json()
}
