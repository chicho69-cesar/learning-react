import { Title } from './Title'
import type { TitleWithButtonProps } from '../types/buttons.d'

export function TitleWithButton({ title, buttonText, onClick }: TitleWithButtonProps) {
  return (
    <Title title={title}>
      <button onClick={onClick}>{buttonText}</button>
    </Title>
  )
}
