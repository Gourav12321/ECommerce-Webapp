// Category Model (Category.model.js)
const mongoose = require('mongoose');
const { Schema } = mongoose;

// SubCategory Schema
const subCategorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

// Category Schema
const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  photo: {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmiqR_gB1aE6SmGpJvgdi6j6MZYtLpcSittA&s'
  },
  subcategories: [{
    type: Schema.Types.ObjectId,
    ref: 'SubCategory'
  }]
});

const Category = mongoose.model('Category', categorySchema);
const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = { Category, SubCategory };
