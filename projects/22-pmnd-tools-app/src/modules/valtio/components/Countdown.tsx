import { useSnapshot } from 'valtio'

import { css } from '../../../../styled-system/css'
import { calcTimeDelta, formatTimeDelta } from '../lib/date-utils'
import { store } from '../store/todos'

interface CountdownProps {
  index: number
}

export default function Countdown({ index }: CountdownProps) {
  /* Para los componentes o los custom hooks podemos acceder al valor de un estado global
  de un proxy usando el hook useSnapshot, el cual recibe como parámetro el proxy,
  y nos regresa el valor del estado */
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
