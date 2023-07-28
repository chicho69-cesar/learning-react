import { useReducer } from 'react'
import { CartContext, cartInitialState, cartReducer } from '.'

function useCartReducer () {
  /* El hook useReducer es un hook el cual nos permite acceder al reducer que
  creamos para nuestro contexto, la cual es una función pura que en base a una
  acción genera un nuevo estado, este hook también recibe el valor inicial del estado
  del contexto, después el reducer nos regresa un arreglo con el estado y un
  dispatch que nos permite ejecutar las acciones que queramos sobre el estado */
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = (product) => dispatch({
    type: 'ADD_TO_CART',
    payload: product,
  })

  const removeFromCart = (product) => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product,
  })

  const clearCart = () => dispatch({
    type: 'CLEAR_CART',
  })

  return {
    state,
    addToCart,
    removeFromCart,
    clearCart,
  }
}

/* Creamos nuestro provider el cual nos va a brindar de acceso a
el contexto y los valores que queremos que tenga nuestro contexto. */
export function CartProvider ({ children }) {
  const { state, addToCart, removeFromCart, clearCart } = useCartReducer()

  return (
    <CartContext.Provider
      value={{
        cart: state, /* Inicializamos el cart con el valor de state regresado por el reducer */
        
        /* Métodos para manipular el estado generados con el dispatch del reducer */
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
