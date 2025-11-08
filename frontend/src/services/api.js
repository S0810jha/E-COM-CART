import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Products API
export const getProducts = async () => {
  try {
    const response = await api.get('/products')
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

// Cart API
export const getCart = async () => {
  try {
    const response = await api.get('/cart')
    return response.data
  } catch (error) {
    console.error('Error fetching cart:', error)
    throw error
  }
}

export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await api.post('/cart', {
      productId,
      qty: quantity
    })
    return response.data
  } catch (error) {
    console.error('Error adding to cart:', error)
    throw error
  }
}

export const removeFromCart = async (itemId) => {
  try {
    const response = await api.delete(`/cart/${itemId}`)
    return response.data
  } catch (error) {
    console.error('Error removing from cart:', error)
    throw error
  }
}

export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await api.put(`/cart/${itemId}`, {
      quantity
    })
    return response.data
  } catch (error) {
    console.error('Error updating cart:', error)
    throw error
  }
}

// Checkout API
export const checkout = async (name, email, cartItems) => {
  try {
    const response = await api.post('/checkout', {
      name,
      email,
      cartItems
    })
    return response.data
  } catch (error) {
    console.error('Error during checkout:', error)
    throw error
  }
}
