import './Cart.css'

import { useId } from 'react'

import { useCart } from '../hooks/useCart.js'
import { CartIcon, ClearCartIcon } from './Icons'
import { CartItem } from './CartItem'

export function Cart () {
  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart } = useCart()

  return (
    <>
      <label htmlFor={cartCheckboxId} className='cart-button'>
        <CartIcon />
      </label>

      <input
        type='checkbox'
        hidden
        id={cartCheckboxId}
      />

      <aside className='cart'>
        <ul>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>

        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}
