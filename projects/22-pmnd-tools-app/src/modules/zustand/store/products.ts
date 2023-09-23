import { create } from 'zustand'
import type { ProductsState } from '../types/product'

export const useProductStore = create<ProductsState>((set) => ({
  products: [],
  addProduct: (product) => {
    set((state) => ({
      products: [...state.products, product]
    }))
  },
  updateProduct: (product) => {
    set((state) => ({
      products: state.products.map((p) => (p.id === product.id ? product : p))
    }))
  },
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id)
    }))
  }
}))
