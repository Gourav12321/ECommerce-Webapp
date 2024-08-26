const Product = require("../model/Product.model");

// Create a new product
const createProduct = async (req, res) => {
  try {
    // Extract product data from the request
    const {
      title,
      description,
      category,
      subcategory,
      price,
      discountPercentage,
      rating,
      stock,
      tags, // Tags should be an array
      brand,
      sku,
      weight,
      dimensions,
      warrantyInformation,
      shippingInformation,
      availabilityStatus,
      returnPolicy,
      minimumOrderQuantity,
      thumbnail,
      images
    } = req.body;

    // Process tags (assuming they come in as a string)
    const processedTags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()).filter(tag => tag);

    // Create a new product document
    const newProduct = new Product({
      title,
      description,
      category,
      subcategory,
      price,
      discountPercentage,
      rating,
      stock,
      tags: processedTags, // Save as array
      brand,
      sku,
      weight,
      dimensions,
      warrantyInformation,
      shippingInformation,
      availabilityStatus,
      returnPolicy,
      minimumOrderQuantity,
      thumbnail,
      images
    });

    // Save the product to the database
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product', error });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate({
        path: 'category',
        populate: {
          path: 'subcategories',
          model: 'SubCategory'
        }
      });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to retrieve products', error: error.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id)
      .populate({
        path: 'category',
        populate: {
          path: 'subcategories',
          model: 'SubCategory'
        }
      });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to retrieve product', error: error.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true })
      .populate({
        path: 'category',
        populate: {
          path: 'subcategories',
          model: 'SubCategory'
        }
      });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
  }
};
// Search products by various fields
const searchProducts = async (req, res) => {
  try {
    const { query } = req.query; // Get search query from the request

    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { 'category.name': { $regex: query, $options: 'i' } },
        { 'subcategory.name': { $regex: query, $options: 'i' } },
        { tags: { $in: [query] } }
      ]
    });

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to search products', error: error.message });
  }
};

module.exports = {
  searchProducts,
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
