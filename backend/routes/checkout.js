import express from 'express';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

const router = express.Router();

// In-memory cart storage (fallback)
let inMemoryCart = [];

// POST /api/checkout - Process checkout and return receipt
router.post('/', async (req, res) => {
  try {
    const { name, email, cartItems } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    let items = cartItems;
    
    // If cartItems not provided, fetch from database
    if (!items || items.length === 0) {
      try {
        const cartData = await CartItem.find().populate('productId');
        items = cartData;
      } catch (dbError) {
        // Fallback to in-memory
        items = inMemoryCart;
      }
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total
    const total = items.reduce((sum, item) => {
      const product = item.productId || item;
      const quantity = item.quantity || 1;
      return sum + (product.price * quantity);
    }, 0);

    // Generate receipt
    const receipt = {
      orderId: `ORD-${Date.now()}`,
      customer: {
        name,
        email
      },
      items: items.map(item => {
        const product = item.productId || item;
        return {
          name: product.name,
          quantity: item.quantity,
          price: product.price,
          subtotal: (product.price * item.quantity).toFixed(2)
        };
      }),
      total: parseFloat(total.toFixed(2)),
      timestamp: new Date().toISOString(),
      status: 'completed'
    };

    // Clear cart after checkout
    try {
      await CartItem.deleteMany({});
    } catch (dbError) {
      inMemoryCart = [];
    }

    res.status(200).json(receipt);
  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({ error: 'Failed to process checkout' });
  }
});

export default router;
