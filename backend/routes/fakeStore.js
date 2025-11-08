import express from 'express';
import axios from 'axios';

const router = express.Router();

const FAKE_STORE_API = 'https://fakestoreapi.com';

// GET /api/fakestore/products - Fetch products from Fake Store API
router.get('/products', async (req, res) => {
  try {
    const response = await axios.get(`${FAKE_STORE_API}/products?limit=8`);
    const products = response.data.map(product => ({
      name: product.title,
      price: product.price,
      description: product.description,
      image: product.image
    }));
    res.json(products);
  } catch (error) {
    console.error('Error fetching from Fake Store API:', error);
    res.status(500).json({ error: 'Failed to fetch products from Fake Store API' });
  }
});

export default router;
