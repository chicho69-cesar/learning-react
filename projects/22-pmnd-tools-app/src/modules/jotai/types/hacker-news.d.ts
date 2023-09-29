export interface PostData {
  by:           string
  descendants?: number
  id:           number
  kids?:        number[]
  parent:       number
  score?:       number
  text?:        string
  time:         number
  title?:       string
  type:         'comment' | 'story'
  url?:         string
}
