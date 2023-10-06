import { useSpring, animated, config } from '@react-spring/web'

import styles from './AsyncCSSVariables.module.css'

export default function AsyncCSSVariables() {
  const [{ background }] = useSpring(() => ({
    from: { background: 'var(--step0)' },
    to: [
      { background: 'var(--step0)' },
      { background: 'var(--step1)' },
      { background: 'var(--step2)' },
      { background: 'var(--step3)' },
      { background: 'var(--step4)' },
    ],
    config: config.molasses,
    loop: {
      reverse: true,
    },
  }), [])

  return (
    <div className={styles.container} title='Async CSS Variables'>
      <div className={styles.squares}>
        <div className={styles.block} />
        <div className={styles.block} />
        <animated.div className={styles.block} style={{ background }} />
      </div>
      <animated.div className={styles.background} style={{ background }} />
    </div>
  )
}
