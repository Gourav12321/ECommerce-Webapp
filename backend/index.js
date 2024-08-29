const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session');
const cors = require('cors');
const UserAuthRoute = require('./routes/UserAuth.routes');
const ProductRoute = require('./routes/Product.routes');
const CategoryRoute = require('./routes/Category.routes');
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Database connected");
}).catch((error) => {
  console.log(error);
});



// Routes
app.use('/api/user', UserAuthRoute);
app.use('/api', ProductRoute);
app.use('/api', CategoryRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
