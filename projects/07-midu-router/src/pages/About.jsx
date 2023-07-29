import { Link } from '../Link.jsx'

const i18n = {
  es: {
    title: 'Sobre nosotros',
    button: 'Ir a la home',
    description: '¡Hola! Me llamo Cesar y estoy creando un clon de React Router.'
  },
  en: {
    title: 'About us',
    button: 'Go to home page',
    description: 'Hi! My name is Cesar and I am creating a clone of React Router.'
  }
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}

export default function AboutPage ({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'es')

  return (
    <>
      <h1>{i18n.title}</h1>

      <div>
        <img 
          src='https://i.pinimg.com/originals/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg' 
          alt='Foto de Cesar' 
        />

        <p>{i18n.description}</p>
      </div>

      <Link to='/'>{i18n.button}</Link>
    </>
  )
}
