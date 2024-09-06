import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryListRef = useRef(null);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/categories');
      // Ensure response.data.categories is an array
      setCategoryProduct(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching category products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  const handleScroll = (direction) => {
    if (categoryListRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      categoryListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative container mx-auto p-4 lg:pt-4 md:pt-16 pt-[5rem] bg-slate-100 border-b-4 rounded-2xl">
      <button
        className="absolute -left-6 top-[40%] transform -translate-y-1/2 z-10 hidden lg:block bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md"
        onClick={() => handleScroll('left')}
      >
        <FaChevronLeft size={24} />
      </button>

      <button
        className="absolute -right-5 top-[40%]  transform -translate-y-1/2 z-10 hidden lg:block bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md"
        onClick={() => handleScroll('right')}
      >
        <FaChevronRight size={24} />
      </button>

      <div
        className="category-list flex lg:gap-12 md:gap-6 gap-4 overflow-x-auto"
        ref={categoryListRef}
      >
        {loading ? (
          categoryLoading.map((_, index) => (
            <div
              className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
              key={`categoryLoading-${index}`}
            />
          ))
        ) : (
          Array.isArray(categoryProduct) && categoryProduct.length > 0 ? (
            categoryProduct.map((product) => (
              <Link to={`/product-category?category=${product._id}`} className="cursor-pointer" key={product._id}>
                <div className="category-item w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center hover:shadow-lg transition-all">
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="h-full object-scale-down mix-blend-multiply hover:scale-110 transition-all"
                  />
                </div>
                <p className="text-center text-sm md:text-base capitalize mt-2">
                  {product.name}
                </p>
              </Link>

            ))
          ) : (
            <p className="text-center text-sm md:text-base capitalize mt-2">
              No categories available
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default CategoryList;
