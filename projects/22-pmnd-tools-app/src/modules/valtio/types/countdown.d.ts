export interface CountdownTimeDeltaOptions {
  readonly overtime?: boolean
}

export interface CountdownTimeDelta {
  readonly total:        number
  readonly days:         number
  readonly hours:        number
  readonly minutes:      number
  readonly seconds:      number
  readonly milliseconds: number
  readonly completed:    boolean
}

export interface CountdownTimeDeltaFormatted {
  readonly days:    string
  readonly hours:   string
  readonly minutes: string
  readonly seconds: string
}
