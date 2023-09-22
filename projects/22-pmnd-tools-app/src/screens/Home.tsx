import { Link } from 'wouter'
import { css } from '../../styled-system/css'

export default function Home() {
  const list = ['jotai', 'valtio', 'zustand', 'react-spring']

  return (
    <div className={container}>
      <h1 className={title}>PMND Tools App</h1>

      <div className={techList}>
        {list.map((item) => (
          <Link href={`/${item}`} className={techItem} key={item}>
            <img src={`/${item}.png`} alt={item} />
            <h3>{item}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

const container = css({
  minH: '100vh',
  backgroundColor: 'slate.600',
  display: 'grid',
  placeContent: 'center'
})

const title = css({
  marginBottom: '2rem',
  textAlign: 'center',
  fontSize: '5xl',
  fontWeight: 'bold',
  color: 'gray.100',
  textShadow: 'sm'
})

const techList = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  gap: '1.5rem'
})

const techItem = css({
  padding: '1rem',
  backgroundColor: 'gray.100',
  shadow: 'lg',
  rounded: 'lg',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)'
  },
  '& img': {
    width: '32',
    rounded: 'sm',
    aspectRatio: 'square',
    objectFit: 'cover',
    objectPosition: 'center'
  },
  '& h3': {
    marginTop: '0.5rem',
    textAlign: 'center',
    fontSize: 'xl',
    fontWeight: 'semibold'
  }
})
