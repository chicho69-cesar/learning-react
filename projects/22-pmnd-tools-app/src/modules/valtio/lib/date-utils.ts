import type {
  CountdownTimeDelta,
  CountdownTimeDeltaFormatted,
  CountdownTimeDeltaOptions
} from '../types/countdown.d'

export function zeroPad(value: (number | string), length: number = 2): string {
  const strValue = String(value)
  if (length === 0) return strValue

  const match = strValue.match(/(.*?)([0-9]+)(.*)/)
  const prefix = match ? match[1] : ''
  const suffix = match ? match[3] : ''
  const strNo = match ? match[2] : strValue

  const paddedNo = strNo.length >= length
    ? strNo
    : ([...Array(length)].map(() => '0').join('') + strNo).slice(length * -1)

  return `${prefix}${paddedNo}${suffix}`
}

export function calcTimeDelta(
  timeLeft: number,
  options: CountdownTimeDeltaOptions = {}
): CountdownTimeDelta {
  const { overtime } = options

  const total = Math.round(
    parseFloat(
      ((overtime ? timeLeft : Math.max(0, timeLeft)) / 1000).toFixed(0)
    ) * 1000
  )

  const seconds = Math.abs(total) / 1000

  return {
    total,
    days: Math.floor(seconds / (3600 * 24)),
    hours: Math.floor((seconds / 3600) % 24),
    minutes: Math.floor((seconds / 60) % 60),
    seconds: Math.floor(seconds % 60),
    milliseconds: Number(((seconds % 1) * 1000).toFixed()),
    completed: total <= 0
  }
}

export function formatTimeDelta(
  timeDelta: CountdownTimeDelta
): CountdownTimeDeltaFormatted {
  const { days, hours, minutes, seconds } = timeDelta

  return {
    days: zeroPad(days, 2),
    hours: zeroPad(hours, 2),
    minutes: zeroPad(minutes, 2),
    seconds: zeroPad(seconds, 2)
  }
}
