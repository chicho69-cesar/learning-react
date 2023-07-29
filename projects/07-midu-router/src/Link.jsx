import { BUTTONS } from './consts'
import { navigate } from './navigate'

export function Link ({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === BUTTONS.primary
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const isManageableEvent = target === undefined || target === '_self'

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
