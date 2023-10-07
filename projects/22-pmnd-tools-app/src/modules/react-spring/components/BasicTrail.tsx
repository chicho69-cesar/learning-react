import React, { useState } from 'react'
import { useTrail, a } from '@react-spring/web'

import styles from './BasicTrail.module.css'

interface TrailProps {
  open: boolean
  children: JSX.Element | JSX.Element[]
}

function Trail({ open, children }: TrailProps) {
  const items = React.Children.toArray(children)

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })

  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className={styles.trailsText} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  )
}

export default function BasicTrail() {
  const [open, set] = useState(true)

  return (
    <div
      className={styles.container}
      onClick={() => set(state => !state)}
      title='Basic Trail'
    >
      <Trail open={open}>
        <span>Lorem</span>
        <span>Ipsum</span>
        <span>Dolor</span>
        <span>Sit</span>
      </Trail>
    </div>
  )
}
