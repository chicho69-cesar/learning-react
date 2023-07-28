export function CartItem ({ thumbnail, price, title, quantity, addToCart }) {
  return (
    <li>
      <img
        src={thumbnail}
        alt={title}
      />

      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>
          Qty: {quantity}
        </small>

        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}
