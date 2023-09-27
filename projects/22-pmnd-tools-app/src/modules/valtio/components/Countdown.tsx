import { useSnapshot } from 'valtio'

import { css } from '../../../../styled-system/css'
import { calcTimeDelta, formatTimeDelta } from '../lib/date-utils'
import { store } from '../store/todos'

interface CountdownProps {
  index: number
}

export default function Countdown({ index }: CountdownProps) {
  const snap = useSnapshot(store.todos[index])
  const delta = calcTimeDelta(snap.timeLeft)

  const { days, hours, minutes, seconds } = formatTimeDelta(delta)

  return (
    <span className={countdownTime}>
      {delta.total < 0 ? '-' : ''}
      {days}
      {days ? ':' : ''}
      {hours}:{minutes}:{seconds}
    </span>
  )
}

const countdownTime = css({
  width: '116px',
  display: 'inline-block',
  padding: '4px',
  marginRight: '12px',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 'medium',
  color: 'white',
  textAlign: 'center',
  backgroundColor: 'slate.800'
})
