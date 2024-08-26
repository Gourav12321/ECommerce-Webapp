import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/categories');
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error(error);
        setMessage('Failed to fetch categories.');
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubCategoryChange = (e) => {
    setSubCategoryName(e.target.value);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/categories', { name: categoryName });
      if (response.data.success) {
        setMessage('Category created successfully!');
        setCategoryName('');
        setCategories([...categories, response.data.category]);
      } else {
        setMessage('Failed to create category.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred.');
    }
  };

  const handleSubCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/subcategories', {
        name: subCategoryName,
        categoryId: selectedCategory,
      });
      if (response.data.success) {
        setMessage('Subcategory created successfully!');
        setSubCategoryName('');
      } else {
        setMessage('Failed to create subcategory.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:pt-0 pt-10 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Category and Subcategory</h1>

      <div className="space-y-6">
        {/* Create Category Form */}
        <form onSubmit={handleCategorySubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create Category</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="category">Category Name</label>
            <input
              type="text"
              id="category"
              value={categoryName}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter category name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Create Category
          </button>
        </form>

        {/* Create Subcategory Form */}
        <form onSubmit={handleSubCategorySubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create Subcategory</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="category">Select Category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="subcategory">Subcategory Name</label>
            <input
              type="text"
              id="subcategory"
              value={subCategoryName}
              onChange={handleSubCategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter subcategory name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Create Subcategory
          </button>
        </form>
      </div>

      {message && <p className="mt-6 text-gray-700 text-center">{message}</p>}
    </div>
  );
};

export default CreateCategory;
