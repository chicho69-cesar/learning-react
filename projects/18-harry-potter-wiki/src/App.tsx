import styles from './App.module.scss'

import useCharacters from './hooks/use-characters'
import Header from './components/Header/Header'
import TypeFilters from './components/TypeFilters/TypeFilters'
import Character from './components/Character/Character'
import Title from './components/Title/Title'

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

          <div className={styles.characters}>
            {filteredCharacters.map((character) => (
              <Character key={character.id} character={character} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
