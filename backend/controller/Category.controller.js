const {Category} = require("../model/Category.model");
const {SubCategory} = require("../model/Category.model");

// Create a new category
const createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json({ success: true, category: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to create category' });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('subcategories');
    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to retrieve categories' });
  }
};

// Update a category by ID
const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, category: updatedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update category' });
  }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete category' });
  }
};



// Create a new subcategory
const createSubCategory = async (req, res) => {
  try {
    const newSubCategory = new SubCategory(req.body);
    await newSubCategory.save();
    res.status(201).json({ success: true,  newSubCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to create subcategory' });
  }
};

// Get all subcategories
const getSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find();
    res.status(200).json({ success: true, subcategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to retrieve subcategories' });
  }
};

// Update a subcategory by ID
const updateSubCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedSubCategory) {
      return res.status(404).json({ success: false, message: 'Subcategory not found' });
    }
    res.status(200).json({ success: true, subcategory: updatedSubCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update subcategory' });
  }
};

// Delete a subcategory by ID
const deleteSubCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSubCategory = await SubCategory.findByIdAndDelete(id);
    if (!deletedSubCategory) {
      return res.status(404).json({ success: false, message: 'Subcategory not found' });
    }
    res.status(200).json({ success: true, message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete subcategory' });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory
};
