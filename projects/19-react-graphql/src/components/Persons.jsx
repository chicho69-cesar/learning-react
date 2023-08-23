import styles from './Persons.module.css'

import { useFindPerson } from '../hooks/use-persons'

export default function Persons({ persons }) {
  const { activePerson, setActivePerson, showPerson } = useFindPerson()

  if (persons === null) return null

  if (activePerson) {
    return (
      <section className={styles.activePerson}>
        <h2>{activePerson.name}</h2>
        <p>{activePerson.address.street}, {activePerson.address.city}</p>
        <p>{activePerson.phone}</p>
        <button onClick={() => setActivePerson(null)}>Close</button>
      </section>
    )
  }

  return (
    <ul className={styles.personsList}>
      {persons.map((person) => (
        <li key={person.id}>
          <article
            className={styles.person}
            onClick={() => showPerson(person.name)}
          >
            <h3>{person.name}</h3>
            <p>{person.phone ? person.phone : 'Sin teléfono'}</p>
          </article>
        </li>
      ))}
    </ul>
  )
}
