import styles from './Title.module.scss'
import useFilters from '../../hooks/use-filters'
import { GENDERS, HOUSES } from '../../constants'

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
          {HOUSES.map((house) => (
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
          {GENDERS.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </section>
    </div>
  )
}
