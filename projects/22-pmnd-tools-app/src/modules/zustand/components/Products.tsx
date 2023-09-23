import type { Product } from '../types/product'
import { useProductStore } from '../store'
import { css } from '../../../../styled-system/css'

interface ProductsProps {
  setProductEditing: (product: Product) => void
}

export default function Products({ setProductEditing }: ProductsProps) {
  const state = useProductStore((state) => state)

  return (
    <section className={section}>
      <table className={table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {state.products.map((product) => (
            <tr key={product.id} className={row}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <button
                  className={`${action} ${editAction}`}
                  onClick={() => setProductEditing(product)}
                >
                  Edit
                </button>

                <button
                  className={`${action} ${deleteAction}`}
                  onClick={() => state.deleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

const section = css({
  flexBasis: '65%'
})

const table = css({
  width: '100%',
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  rounded: 'md',
  borderCollapse: 'collapse',
  overflow: 'hidden',

  '& th': {
    fontWeight: 'bold',
    backgroundColor: 'slate.700',
    color: 'white',
  }
})

const row = css({
  width: '100%',
  padding: '0.5rem 1rem',
  border: '1px solid #ccc',
  textAlign: 'center'
})

const action = css({
  margin: '0.25rem',
  padding: '0.25rem 0.5rem',
  cursor: 'pointer',
  color: 'white',
  rounded: 'sm'
})

const editAction = css({
  backgroundColor: 'orange.500'
})

const deleteAction = css({
  backgroundColor: 'red.500'
})
