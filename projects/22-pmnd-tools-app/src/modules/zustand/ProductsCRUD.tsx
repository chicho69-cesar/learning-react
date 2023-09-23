import { useState } from 'react'

import { css } from '../../../styled-system/css'
import type { Product } from './types/product'
import Form from './components/Form'
import Products from './components/Products'

export default function ProductsCRUD() {
  const [isEditing, setIsEditing] = useState(false)
  const [productEditing, setProductEditing] = useState<Product | null>(null)

  return (
    <div className={container}>
      <Form
        isEditing={isEditing}
        toggleEditing={() => setIsEditing(false)}
        productEditing={isEditing ? productEditing : null}
      />

      <Products
        setProductEditing={(product: Product) => {
          setProductEditing(product)
          setIsEditing(true)
        }}
      />
    </div>
  )
}

const container = css({
  width: '90%',
  maxWidth: '960px',
  margin: '2rem auto',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'no-wrap',
  justifyContent: 'space-between',
  alignItems: 'start',
  gap: '2rem',
})
