import styles from './Header.module.scss'

import useSearch from '../../hooks/use-search'

export default function Header() {
  const { search, handleSearch } = useSearch()

  return (
    <header className={styles.header}>
      <div className={styles.block}>
        <h1 className={styles.logo}>Potter Pedía</h1>

        <input
          className={styles.searcher}
          type='text'
          placeholder='Harry Potter...'
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </header>
  )
}
