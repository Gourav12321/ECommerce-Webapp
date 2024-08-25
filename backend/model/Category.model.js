const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the SubCategory schema
const subCategorySchema = new Schema({
  name: {
    type: String,
  }
});

// Create and export the SubCategory model
const SubCategory = mongoose.model('SubCategory', subCategorySchema);

// Define the Category schema
const categorySchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  photo : {
    type:String,
    default : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmiqR_gB1aE6SmGpJvgdi6j6MZYtLpcSittA&s'
  },
  subcategories: [{
    type: Schema.Types.ObjectId,
    ref: 'SubCategory'
  }]
});

// Create and export the Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = { Category, SubCategory };
