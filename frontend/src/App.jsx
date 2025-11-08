import { useState, useEffect } from 'react'
import Products from './components/Products'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import ReceiptModal from './components/ReceiptModal'
import { getCart } from './services/api'

function App() {
  const [activeTab, setActiveTab] = useState('products')
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [receipt, setReceipt] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      const cartData = await getCart()
      setCart(cartData)
    } catch (error) {
      console.error('Error loading cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckoutComplete = (receiptData) => {
    setReceipt(receiptData)
    setActiveTab('products')
    loadCart() // Refresh cart (should be empty after checkout)
  }

  const handleCloseReceipt = () => {
    setReceipt(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Vibe Commerce</h1>
            <nav className="flex gap-4">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'products'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab('cart')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
                  activeTab === 'cart'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Cart
                {cart.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {cart.items.length}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        ) : activeTab === 'products' ? (
          <Products onCartUpdate={loadCart} />
        ) : (
          <Cart
            cart={cart}
            onCartUpdate={loadCart}
            onCheckout={() => setActiveTab('checkout')}
          />
        )}

        {activeTab === 'checkout' && (
          <Checkout
            cart={cart}
            onComplete={handleCheckoutComplete}
            onBack={() => setActiveTab('cart')}
          />
        )}
      </main>

      {/* Receipt Modal */}
      {receipt && (
        <ReceiptModal receipt={receipt} onClose={handleCloseReceipt} />
      )}
    </div>
  )
}

export default App
