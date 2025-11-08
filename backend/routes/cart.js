import express from 'express';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

const router = express.Router();

// In-memory cart storage (fallback if DB fails)
let inMemoryCart = [];


// GET /api/cart - Get cart with total
router.get('/', async (req, res) => {
  try {
    let cartItems;
    
    try {
      cartItems = await CartItem.find().populate('productId');
    } catch (dbError) {
      // Fallback to in-memory if DB fails
      console.log('Using in-memory cart storage');
      cartItems = inMemoryCart;
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      const product = item.productId || item;
      const quantity = item.quantity || 1;
      return sum + (product.price * quantity);
    }, 0);

    res.json({
      items: cartItems,
      total: parseFloat(total.toFixed(1))
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST /api/cart - Add item to cart
router.post('/', async (req, res) => {
  try {
    const { productId, qty } = req.body;

    if (!productId || !qty || qty < 1) {
      return res.status(400).json({ error: 'Invalid productId or quantity' });
    }

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let cartItem;
    
    try {
      // Check if item already exists in cart
      cartItem = await CartItem.findOne({ productId });
      
      if (cartItem) {
        // Update quantity
        cartItem.quantity += qty;
        await cartItem.save();
      } else {
        // Create new cart item
        cartItem = await CartItem.create({ productId, quantity: qty });
      }
      
      await cartItem.populate('productId');
    } catch (dbError) {
      // Fallback to in-memory
      console.log('Using in-memory cart storage');
      const existingItemIndex = inMemoryCart.findIndex(
        item => item.productId.toString() === productId
      );
      
      if (existingItemIndex >= 0) {
        inMemoryCart[existingItemIndex].quantity += qty;
        cartItem = inMemoryCart[existingItemIndex];
      } else {
        cartItem = { _id: Date.now().toString(), productId: product, quantity: qty };
        inMemoryCart.push(cartItem);
      }
    }

    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    let deleted;
    
    try {
      deleted = await CartItem.findByIdAndDelete(id);
    } catch (dbError) {
      // Fallback to in-memory
      console.log('Using in-memory cart storage');
      const index = inMemoryCart.findIndex(item => item._id === id);
      if (index >= 0) {
        deleted = inMemoryCart.splice(index, 1)[0];
      }
    }

    if (!deleted) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json({ message: 'Item removed from cart', deleted });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

// PUT /api/cart/:id - Update cart item quantity
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    let updated;
    
    try {
      updated = await CartItem.findByIdAndUpdate(
        id,
        { quantity },
        { new: true }
      ).populate('productId');
    } catch (dbError) {
      // Fallback to in-memory
      console.log('Using in-memory cart storage');
      const item = inMemoryCart.find(item => item._id === id);
      if (item) {
        item.quantity = quantity;
        updated = item;
      }
    }

    if (!updated) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

export default router;
