import type { TitleProps } from '../types/buttons.d'

export function Title({ title, children }: TitleProps) {
  return (
    <div 
      style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <h1>{title}</h1>
      {children}
    </div>
  )
}
