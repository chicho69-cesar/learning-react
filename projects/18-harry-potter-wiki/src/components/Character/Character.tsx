import styles from './Character.module.scss'
import { Character } from '../../types/characters'

interface Props {
  character: Character
}

export default function Character({ character }: Props) {
  return (
    <article className={styles.character}>
      <img
        className={styles.image}
        src={character.image === '' ? '../public/no-image.png' : character.image}
        alt={character.name}
      />

      <footer className={styles.footer}>
        <h4 className={styles.characterName}>{character.name}</h4>

        {character.alternate_names.length > 0 && (
          <h6 className={styles.nickname}>
            {character.alternate_names[0]}
          </h6>
        )}

        <section className={styles.characterInfo}>
          <span>{character.actor}</span>
          <span>{character.species}</span>
          <span>{character.gender}</span>
        </section>

        <p className={styles.alive}>
          Is alive? {character.alive ? '👍' : '👎'}
        </p>

        {character.house !== '' && (
          <img
            src={`../../../public/${character.house}.png`}
            alt={character.house}
            className={styles.house}
          />
        )}
      </footer>
    </article>
  )
}
