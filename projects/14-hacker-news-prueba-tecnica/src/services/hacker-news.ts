const API_URL = 'https://hacker-news.firebaseio.com/v0'

export async function getTopStories(page: number, limit: number) {
  const response = await fetch(`${API_URL}/topstories.json`)
  const json = await response.json()

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const ids = json.slice(startIndex, endIndex)

  return ids

  // junior dev tip: use Promise.all to fetch multiple items in parallel
  // return await Promise.all(ids.map((id: number) => getItemInfo(id)))
}

export async function getItemInfo(id: number) {
  const response = await fetch(`${API_URL}/item/${id}.json`)
  return await response.json()
}
