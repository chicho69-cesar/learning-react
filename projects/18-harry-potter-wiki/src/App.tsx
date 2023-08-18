import styles from './App.module.scss'

import useCharacters from './hooks/use-characters'
import Header from './components/Header/Header'
import TypeFilters from './components/TypeFilters/TypeFilters'
import Title from './components/Title/Title'
import Characters from './components/Characters/Characters'

export default function App() {
  const { filteredCharacters } = useCharacters()

  return (
    <>
      <Header />

      <main className={styles.container}>
        <aside className={styles.sidebar}>
          <TypeFilters />
        </aside>

        <section className={styles.content}>
          <Title />
          <Characters characters={filteredCharacters} />
        </section>
      </main>
    </>
  )
}
