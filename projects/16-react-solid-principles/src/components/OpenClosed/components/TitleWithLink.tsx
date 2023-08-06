import { Title } from './Title'
import type { TitleWithLinkProps } from '../types/buttons.d'

export function TitleWithLink({ title, href, buttonText }: TitleWithLinkProps) {
  return (
    <Title title={title}>
      <div>
        <a href={href}>{buttonText}</a>
      </div>
    </Title>
  )
}
