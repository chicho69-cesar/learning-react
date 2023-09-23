import { useId } from 'react'

import type { Product } from '../types/product'
import { useProductStore } from '../store'
import { css } from '../../../../styled-system/css'

interface FormProps {
  isEditing: boolean,
  toggleEditing: () => void
  productEditing: Product | null
}

export default function Form({ isEditing, toggleEditing, productEditing }: FormProps) {
  const state = useProductStore((state) => state)

  const nameId = useId()
  const priceId = useId()
  const descriptionId = useId()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    const product = {
      name: data.name as string,
      description: data.description as string,
      price: Number(data.price),
    }

    if (isEditing) {
      state.updateProduct({ id: productEditing!.id, ...product })

      toggleEditing()
    } else {
      state.addProduct({
        id: (Math.floor(Math.random() * 1000)).toString(),
        ...product,
      })

    }

    form.reset()
  }

  return (
    <form onSubmit={handleSubmit} className={form}>
      <div>
        <label htmlFor={nameId}>Name</label>
        
        <input
          type='text'
          id={nameId}
          name='name'
          defaultValue={productEditing ? productEditing.name : ''}
          autoComplete='off'
          placeholder='cookies...'
        />
      </div>
      
      <div>
        <label htmlFor={priceId}>Price</label>
        
        <input
          type='text'
          id={priceId}
          name='price'
          defaultValue={productEditing ? productEditing.price : ''}
          autoComplete='off'
          placeholder='$120.00'
        />
      </div>

      <div>
        <label htmlFor={descriptionId}>Description</label>
        
        <textarea
          id={descriptionId}
          name='description'
          defaultValue={productEditing ? productEditing.description : ''}
          autoComplete='off'
          placeholder='the best cookies ever...'
        />
      </div>
      
      <button>
        {isEditing ? 'Update' : 'Create'}
      </button>
    </form>
  )
}

const form = css({
  flexBasis: '35%',
  display: 'inline-block',
  padding: '1rem',
  backgroundColor: 'white',
  shadow: 'lg',
  rounded: 'lg',

  '& div': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
  },

  '& label': {
    fontWeight: 'semibold',
    fontSize: '0.8rem',
    marginBottom: '0.25rem'
  },

  '& input, & textarea': {
    outline: 'none',
    border: '1px solid #ccc',
    padding: '0.5rem',
    rounded: 'md'
  },

  '& textarea': {
    minHeight: '16'
  },

  '& button': {
    display: 'inline-block',
    backgroundColor: 'slate.700',
    padding: '0.5rem 2.5rem',
    color: 'white',
    fontWeight: 'bold',
    rounded: 'md',
    shadow: 'md',
    transition: 'all 0.1s ease-in-out',

    '&:hover': {
      cursor: 'pointer',
      shadow: 'lg',
      transform: 'translateY(-2px)'
    }
  }
})
