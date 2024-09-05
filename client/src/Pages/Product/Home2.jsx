import axios from 'axios';
import React, { useEffect, useState } from 'react';
import VerticalCardProduct from './VerticalCardProduct';

const Home2 = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategoryProduct = async () => {
    try {
      const response = await axios.get('/api/categories');
      // Ensure the response data is an array
      setCategoryProduct(response.data.categories || []);
    } catch (error) {
      setError('Error fetching category products');
      console.error('Error fetching category products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  // If data is still being fetched, show loading message
  if (loading) {
    return <p>Loading products...</p>;
  }

  // If there was an error fetching products, show error message
  if (error) {
    return <p>{error}</p>;
  }

  // If no products are available, show "No products available" message
  if (!Array.isArray(categoryProduct) || categoryProduct.length === 0) {
    return <p>No products available</p>;
  }

  // Render the list of products
  return (
    <div>
      {categoryProduct.map((product, index) => (
        <div key={index}>
          <VerticalCardProduct heading={product.name} categoryName={product.name} />
        </div>
      ))}
    </div>
  );
};

export default Home2;
