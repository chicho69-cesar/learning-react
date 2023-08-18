import styles from './Title.module.scss'
import useFilters from '../../hooks/use-filters'

const houses = ['House', 'Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin']
const genres = ['Genre', 'male', 'female', 'neutral']

export default function Title() {
  const { filters, changeHouse, changeGenre } = useFilters()

  const handleChangeHouse = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeHouse(event.target.value)
  }

  const handleChangeGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeGenre(event.target.value)
  }

  return (
    <div className={styles.titleContainer}>
      <h3 className={styles.title}>Personajes</h3>

      <section>
        <select
          className={styles.filter}
          value={filters.house}
          onChange={handleChangeHouse}
        >
          {houses.map((house) => (
            <option key={house} value={house}>
              {house}
            </option>
          ))}
        </select>

        <select
          className={styles.filter}
          value={filters.genre}
          onChange={handleChangeGenre}
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </section>
    </div>
  )
}
