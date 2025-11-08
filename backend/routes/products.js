import express from 'express';
import Product from '../models/Product.js';
import { defaultProducts } from '../assets/defaultProducts.js';

const router = express.Router();

// Initialize or update products in database
const initializeProducts = async () => {
  try {
    const count = await Product.countDocuments();
    
    if (count === 0) {
      // If database is empty, insert all products
      await Product.insertMany(defaultProducts);
      console.log('Default products initialized');
    } else {
      // Update existing products with new data from defaultProducts
      for (const productData of defaultProducts) {
        await Product.findOneAndUpdate(
          { name: productData.name },
          {
            $set: {
              name: productData.name,
              price: productData.price,
              description: productData.description,
              image: productData.image
            }
          },
          { upsert: true, new: true }
        );
      }
      console.log('Products updated with latest data');
    }
  } catch (error) {
    console.error('Error initializing/updating products:', error);
    throw error;
  }
};

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    await initializeProducts();
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST /api/products/refresh - Manually refresh/update products from defaultProducts
router.post('/refresh', async (req, res) => {
  try {
    await initializeProducts();
    const products = await Product.find();
    res.json({ 
      message: 'Products refreshed successfully',
      count: products.length,
      products 
    });
  } catch (error) {
    console.error('Error refreshing products:', error);
    res.status(500).json({ error: 'Failed to refresh products' });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

export default router;
