const express = require('express');
const router = express.Router();
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controller/Category.controller');
const { createSubCategory, getSubCategories, updateSubCategory, deleteSubCategory } = require('../controller/Category.controller');

// Routes for category management
router.post('/categories', createCategory);
router.get('/categories', getCategories);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);



// Routes for subcategory management
router.post('/subcategories', createSubCategory);
router.get('/subcategories', getSubCategories);
router.put('/subcategories/:id', updateSubCategory);
router.delete('/subcategories/:id', deleteSubCategory);

module.exports = router;