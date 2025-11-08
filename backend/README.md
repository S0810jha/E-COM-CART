# Backend API - Vibe Commerce

Express.js backend API for the shopping cart application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (optional):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
```

3. Start MongoDB (if running locally)

4. Start the server:
```bash
npm start
# or
npm run dev
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get cart with total
- `POST /api/cart` - Add item to cart
  - Body: `{ productId: string, qty: number }`
- `PUT /api/cart/:id` - Update cart item quantity
  - Body: `{ quantity: number }`
- `DELETE /api/cart/:id` - Remove item from cart

### Checkout
- `POST /api/checkout` - Process checkout
  - Body: `{ name: string, email: string, cartItems?: array }`

## Database

The application uses MongoDB with Mongoose. If MongoDB is not available, it falls back to in-memory storage for development purposes.

## Models

### Product
- name: String
- price: Number
- description: String
- image: String

### CartItem
- productId: ObjectId (reference to Product)
- quantity: Number
