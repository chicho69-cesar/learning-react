export interface Product {
  id:          string
  name:        string
  price:       number
  description: string
}

export interface ProductsState {
  products:      Product[]
  addProduct:    (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void
}
