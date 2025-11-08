# Vibe Commerce - Shopping Cart Application

A full-stack shopping cart application built with React (Vite), Node.js/Express, and MongoDB.

## Features

- 🛍️ Product listing with grid layout
- 🛒 Shopping cart with add/remove items
- 📊 Quantity management (increase/decrease)
- 💳 Mock checkout process
- 📄 Receipt generation
- 💾 Database persistence (MongoDB)
- 📱 Responsive design
- ⚡ Error handling
- 🎨 Modern UI with TailwindCSS

## Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- Axios

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- CORS

## Project Structure

```
cart/
├── backend/
│   ├── models/
│   │   ├── Product.js
│   │   └── CartItem.js
│   ├── routes/
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── checkout.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Products.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   └── ReceiptModal.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
└── README.md
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get cart with total
- `POST /api/cart` - Add item to cart (body: `{productId, qty}`)
- `PUT /api/cart/:id` - Update cart item quantity (body: `{quantity}`)
- `DELETE /api/cart/:id` - Remove item from cart

### Checkout
- `POST /api/checkout` - Process checkout (body: `{name, email, cartItems?}`)

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
```

4. Start MongoDB (if running locally):
```bash
# Make sure MongoDB is running on your system
```

5. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Start the backend server (port 5000)
2. Start the frontend server (port 5173)
3. Open your browser and navigate to `http://localhost:5173`
4. Browse products and add them to your cart
5. View your cart and adjust quantities
6. Proceed to checkout
7. Enter your name and email
8. Complete the order to see the receipt

## Features Implementation

### ✅ Core Requirements
- [x] GET /api/products - Returns 5-10 mock products
- [x] POST /api/cart - Add items to cart
- [x] DELETE /api/cart/:id - Remove items from cart
- [x] GET /api/cart - Get cart with total
- [x] POST /api/checkout - Mock checkout with receipt
- [x] Products grid with "Add to Cart" button
- [x] Cart view with items, quantity, and total
- [x] Remove and update buttons in cart
- [x] Checkout form (name/email)
- [x] Receipt modal after checkout
- [x] Responsive design

### ✅ Bonus Features
- [x] Database persistence (MongoDB)
- [x] Error handling
- [x] Fallback to in-memory storage if DB fails
- [x] Loading states and user feedback
- [x] Form validation

## Notes

- The application uses MongoDB for persistence but includes a fallback to in-memory storage if MongoDB is not available
- All prices are in USD
- The checkout process is a mock - no real payments are processed
- Products are automatically initialized in the database on first run

## Development

### Backend Development
- The backend uses ES6 modules
- MongoDB connection is handled automatically
- Routes are organized by feature

### Frontend Development
- Uses Vite for fast development
- TailwindCSS for styling
- Components are organized by feature
- API calls are centralized in `services/api.js`

## License

This project is created for Vibe Commerce internship assignment.
