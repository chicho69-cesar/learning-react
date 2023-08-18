import styles from './TypeFilters.module.scss'

import { memo } from 'react'
import Filter from './Filter'

export function TypeFilters() {
  return (
    <section className={styles.filters}>
      <Filter name='all' text='All' />
      <Filter name='wizards' text='Wizards' />
      <Filter name='muggles' text='Muggles' />
      <Filter name='half-blob' text='Half-Blobs' />
      <Filter name='pure-blob' text='Pure-Blobs' />
      <Filter name='alive' text='Alive' />
    </section>
  )
}

export default memo(TypeFilters)
