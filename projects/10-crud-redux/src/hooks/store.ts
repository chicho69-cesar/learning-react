import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { AppDispatch, RootState } from '../store'

/* Podemos crear un appSelector personalizado para poder tipar el useSelector
de redux y donde ademas podremos acceder al estado de una forma mas controlada
asi si cambiamos nuestro gestor de estado no tener que estarlo cambiando a lo
largo de toda la aplicación */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
/* Hacemos lo mismo para el dispatch */
export const useAppDispatch: () => AppDispatch = useDispatch
