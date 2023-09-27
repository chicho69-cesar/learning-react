export type Status = 'pending' | 'completed' | 'overdue'
export type Filter = Status | 'all'

export interface Todo {
  description: string
  status:      Status
  id:          number
  timeLeft:    number
  timeout?:    number
}

export interface TodoProxyStore {
  filter: Filter
  todos:  Todo[]
}
