import { IS_DEVELOPMENT } from './config.js'
import { products as initialProducts } from './mocks/products.json'
import { CartProvider } from './context/cart'
import { useFilters } from './hooks/useFilters.js'
import { Header } from './components/Header'
import { Cart } from './components/Cart'
import { Products } from './components/Products'
import { Footer } from './components/Footer'

function App() {
  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(initialProducts)

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  )
}

export default App
