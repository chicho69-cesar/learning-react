import styles from './Characters.module.scss'

import { Character as CharacterType } from '../../types/characters'
import Character from '../Character/Character'

interface Props {
  characters: CharacterType[]
}

export default function Characters({ characters }: Props) {
  return (
    <div className={styles.characters}>
      {characters.map((character) => (
        <Character key={character.id} character={character} />
      ))}
    </div>
  )
}
