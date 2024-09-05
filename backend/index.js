const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const UserAuthRoute = require('./routes/UserAuth.routes');
const ProductRoute = require('./routes/Product.routes');
const CategoryRoute = require('./routes/Category.routes');
const OrderRoute = require('./routes/Cart.routes');
const orderRoutes = require('./routes/Orders.route');
const AdminDashboard = require('./routes/AdminDashboard.route');
const wishlist = require('./routes/wishlist.routes');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Serve static files from the 'client/dist' directory
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Handle all other routes and send the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// API routes
app.use('/api/user', UserAuthRoute);
app.use('/api', ProductRoute);
app.use('/api', CategoryRoute);
app.use('/api/cart', OrderRoute);
app.use('/api/order', orderRoutes);
app.use('/api', AdminDashboard);
app.use('/api', wishlist);

// Serve static files from the 'receipts' directory
app.use('/receipts', express.static(path.join(__dirname, 'receipts')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
