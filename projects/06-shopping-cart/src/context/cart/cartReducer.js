import { updateLocalStorage } from '../../helpers/localstorage'

// Estado inicial de la aplicación
export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

// Acciones del reducer
export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
}

/* Los reducers son funciones puras, que reciben el estado actual y una cierta
acción para poder manipular este estado y realizar operaciones con el para actualizarlo,
posteriormente a manipularlo se devuelve un nuevo estado, el cual no debe ser el mismo
que recibe modificado, sino que debe ser uno generado totalmente nuevo */

/* ***** FORMA TRADICIONAL: Usando Switch ***** */
export function cartReducerTraditional (state, action) {
  const { type, payload } = action

  switch (type) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const { id } = payload
      const productInCartIndex = state.findIndex((item) => item.id === id)

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state)
        newState[productInCartIndex].quantity += 1

        updateLocalStorage('cart', newState)
        return newState
      }

      const newState = [
        ...state,
        {
          ...payload,
          quantity: 1
        }
      ]

      updateLocalStorage('cart', newState)
      return newState
    }

    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const { id } = payload
      const newState = state.filter((item) => item.id !== id)

      updateLocalStorage('cart', newState)
      return newState
    }

    case CART_ACTION_TYPES.CLEAR_CART: {
      updateLocalStorage('cart', [])
      return []
    }

    default: 
      return state
  }
}

/* ***** FORMA CON OBJETOS ***** */
const UPDATE_STATE_BY_ACTION = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
    const { id } = action.payload
    const productInCartIndex = state.findIndex((item) => item.id === id)

    if (productInCartIndex >= 0) {
      //* 👀 una forma sería usando structuredClone
      /* const newState = structuredClone(state)
      newState[productInCartIndex].quantity += 1 */

      //* 👶 usando el map
      /* const newState = state.map(item => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }

        return item
      }) */

      //* ⚡ usando el spread operator y slice
      const newState = [
        ...state.slice(0, productInCartIndex),
        { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1 },
        ...state.slice(productInCartIndex + 1)
      ]

      updateLocalStorage('cart', newState)
      return newState
    }

    const newState = [
      ...state,
      {
        ...action.payload,
        quantity: 1,
      }
    ]

    updateLocalStorage('cart', newState)
    return newState
  },
  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
    const { id } = action.payload
    const newState = state.filter((item) => item.id !== id)

    updateLocalStorage('cart', newState)
    return newState
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    updateLocalStorage('cart', [])
    return []
  }
}

export function cartReducer (state, action) {
  const { type: actionType } = action
  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  return updateState ? updateState(state, action): state
}
