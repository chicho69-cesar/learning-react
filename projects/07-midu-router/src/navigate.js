import { EVENTS } from './consts'

/* Creamos la típica función navigate de todos los routers
la cual nos sirve para establecer la navegación entre paginas, cambiando
la url del navegador sin necesidad de hacer pull refresh de la pagina */
export function navigate (href) {
  window.history.pushState({}, '', href) // Cambiamos la url del navegador
  const navigationEvent = new Event(EVENTS.PUSHSTATE) // Creamos un evento custom
  window.dispatchEvent(navigationEvent) // Lanzamos el evento
}
