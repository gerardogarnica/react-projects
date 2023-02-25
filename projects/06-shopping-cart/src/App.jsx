import { Cart } from './components/Cart.jsx'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { Products } from './components/Products.jsx'
import { CartProvider } from './context/cart.jsx'
import { useFilters } from './hooks/useFilters'
import { products as initialProducts } from './mocks/products.json'
import { IS_DEVELOPMENT } from './config.js'

function App () {
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
