import { useState } from 'react'
import { removeFromCart, updateCartItem } from '../services/api'

function Cart({ cart, onCartUpdate, onCheckout }) {
  const [updating, setUpdating] = useState(null)
  const [removing, setRemoving] = useState(null)

  const handleRemove = async (itemId) => {
    try {
      setRemoving(itemId)
      await removeFromCart(itemId)
      onCartUpdate()
    } catch (error) {
      alert('Failed to remove item. Please try again.')
      setRemoving(null)
    }
  }

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemove(itemId)
      return
    }

    try {
      setUpdating(itemId)
      await updateCartItem(itemId, newQuantity)
      onCartUpdate()
    } catch (error) {
      alert('Failed to update quantity. Please try again.')
    } finally {
      setUpdating(null)
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-lg shadow-md p-12 max-w-md mx-auto">
          <svg
            className="mx-auto h-24 w-24 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {cart.items.map((item) => {
            const product = item.productId || item
            const itemId = item._id
            const quantity = item.quantity || 1
            const subtotal = (product.price * quantity).toFixed(2)

            return (
              <div
                key={itemId}
                className="p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
              >
                <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x300?text=No+Image'
                    }}
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    ${product.price.toFixed(2)} each
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">Quantity:</label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(itemId, quantity - 1)}
                          disabled={updating === itemId || removing === itemId}
                          className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-medium">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(itemId, quantity + 1)}
                          disabled={updating === itemId || removing === itemId}
                          className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(itemId)}
                      disabled={removing === itemId}
                      className="text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                    >
                      {removing === itemId ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">
                    ${subtotal}
                  </p>
                  <p className="text-sm text-gray-500">
                    ${product.price.toFixed(2)} × {quantity}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-semibold text-gray-800">Total:</span>
            <span className="text-2xl font-bold text-blue-600">
              ${cart.total.toFixed(2)}
            </span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
