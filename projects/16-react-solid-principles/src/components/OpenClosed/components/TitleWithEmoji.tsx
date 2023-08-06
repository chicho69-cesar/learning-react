import { Title } from './Title'
import type { TitleWithEmojiProps } from '../types/buttons.d'

export function TitleWithEmoji({ title, emoji }: TitleWithEmojiProps) {
  return (
    <Title title={title}>
      <p style={{ fontSize: '48px' }}>{emoji}</p>
    </Title>
  )
}
