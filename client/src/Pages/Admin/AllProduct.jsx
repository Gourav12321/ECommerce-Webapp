import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products'); // Adjust the endpoint as needed
        setProducts(data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleEdit = (id) => {
    // Redirect or show edit form for the product
    window.location.href = `/edit-product/${id}`;
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() => handleCardClick(product)}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600">{product.price} USD</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/2 max-w-4xl h-5/6 relative overflow-y-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedProduct.title}</h2>
            <img
              src={selectedProduct.thumbnail}
              alt={selectedProduct.title}
              className="w-full h-64 object-cover mb-4"
            />
            <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
            <p className="mb-2"><strong>Price:</strong> {selectedProduct.price} USD</p>
            <p className="mb-2"><strong>Rating:</strong> {selectedProduct.rating} / 5</p>
            <p className="mb-2"><strong>Brand:</strong> {selectedProduct.brand}</p>
            <p className="mb-2"><strong>Stock:</strong> {selectedProduct.stock}</p>
            <p className="mb-2"><strong>Tags:</strong> {selectedProduct.tags.join(', ')}</p>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleEdit(selectedProduct._id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(selectedProduct._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
