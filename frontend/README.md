# Frontend - Vibe Commerce

React frontend application built with Vite and TailwindCSS.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Environment Variables

Create a `.env` file (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

## Components

### Products
- Displays products in a grid layout
- Add to cart functionality
- Responsive design

### Cart
- Shows cart items with quantities
- Update quantity controls
- Remove items
- Total calculation
- Empty cart state

### Checkout
- Form validation
- Customer information (name, email)
- Order summary
- Mock checkout process

### ReceiptModal
- Displays order confirmation
- Order details
- Receipt information

## Styling

The application uses TailwindCSS for styling. All components are responsive and mobile-friendly.
