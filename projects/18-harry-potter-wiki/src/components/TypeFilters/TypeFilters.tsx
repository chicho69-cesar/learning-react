import styles from './TypeFilters.module.scss'

import { memo } from 'react'
import Filter from './Filter'
import { typeFiltersKeys } from '../../constants'
import { capitalize } from '../../helpers/strings'

export function TypeFilters() {
  return (
    <section className={styles.filters}>
      {typeFiltersKeys.map((filter) => (
        <Filter
          key={filter}
          name={filter}
          text={capitalize(filter as string)} 
        />
      ))}
    </section>
  )
}

export default memo(TypeFilters)
