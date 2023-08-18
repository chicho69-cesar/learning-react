import styles from './Filter.module.scss'

import { useId } from 'react'
import useFilters from '../../hooks/use-filters'

interface Props {
  name: string
  text: string
}

export default function Filter({ name, text }: Props) {
  const { typeFilters, changeTypeFilter } = useFilters()
  const filterId = useId()

  const handleSelectFilter: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    changeTypeFilter(name, e.target.checked)
  }

  return (
    <div className={styles.formGroup}>
      <input
        type='checkbox'
        name={name}
        id={filterId}
        checked={typeFilters[name as keyof typeof typeFilters]}
        onChange={handleSelectFilter}
      />

      <label htmlFor={filterId}>{text}</label>
    </div>
  )
}
