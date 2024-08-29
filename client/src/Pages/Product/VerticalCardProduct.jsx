import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import 'swiper/css/pagination';
import { Pagination} from 'swiper/modules';

const VerticalCardProduct = ({ heading, categoryName }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/products/category/${categoryName}`);
        setProducts(response.data.products);
      } catch (err) {
        console.error('Error fetching products:', err); // Log full error
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">{heading}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Swiper
          spaceBetween={30}

          slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2, // For small screens
              },
              768: {
                slidesPerView: 3, // For medium screens
              },
              1024: {
                slidesPerView: 4, // For large screens
              },
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination]}
            className='h-[16rem]'
          >
            {products.length > 0 ? (
              products.map((product) => (
                <SwiperSlide key={product._id}>
                  <Link to={`/product/${product._id}`}>
                    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-32 object-contain  rounded" // Adjusted to be responsive
                      />
                      <h3 className="text-lg font-medium mt-2">{product.title}</h3>
                      <p className="text-sm text-gray-600">${product.price}</p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
