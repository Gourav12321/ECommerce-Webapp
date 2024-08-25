const express = require('express');
const router = express.Router();
const {createProduct,getProducts,updateProduct,deleteProduct,getProductById} = require('../controller/Product.controller');
router.post('/products',createProduct);
router.get('/products',getProducts);
router.get('/products/:id',getProductById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
