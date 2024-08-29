import React from "react";
import { Link } from "react-router-dom";
import { Rating } from '@mui/material';
const ProductList = ({ products }) => {
  const productsArray = Array.isArray(products) ? products : products?.products;

  if (!Array.isArray(productsArray)) {
    console.error('Products is not an array', products);
    return <div>No products available</div>;
  }
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {productsArray.map((product , index) => (
          <div key={product._id} className="bg-white shadow-md md:p-4 p-2 text-[14px] rounded-lg">
            <Link to={`/product/${product._id}`}>
            <img
              src={product.thumbnail} // Fallback image in case thumbnail is missing
              alt={product.title}
              className="w-full h-40 object-contain mb-4 rounded-lg"
            />
            <div className=" flex flex-col items-baseline">
            <h3 className="md:text-lg  font-semibold ">{product.title}</h3>
            <p className="text-gray-600">
              {Array.isArray(product.category)
                ? " "
                : product.category.name}
            </p>
            <p className="text-gray-800 font-semibold">₹{product.price}</p>
            <div className="">
            <Rating
                    name={`product-rating`}
                    value={product.rating}
                    readOnly
                    precision={0.5}
                  />
                  </div>
                  </div>
            </Link>
          </div>
        ))}
      </div>
    );
};

export default ProductList;
