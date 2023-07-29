import { BUTTONS } from './consts'
import { navigate } from './navigate'

export function Link ({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === BUTTONS.primary // Botón primario del mouse
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey // Abrir la pagina de una forma especial
    const isManageableEvent = target === undefined || target === '_self' // Se abre en la misma ventana

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to)
      // window.scrollTo(0, 0)
    }
  }

  return (
    <a
      href={to}
      target={target}
      onClick={handleClick}
      {...props}
    />
  )
}
