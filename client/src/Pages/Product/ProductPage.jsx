import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactImageMagnify from 'react-image-magnify';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data.product);
        setSelectedImage(response.data.product.images[0]); // Set default image
      } catch (err) {
        setError('Failed to load product.');
        toast.error('Failed to load product.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center mt-10 text-xl font-semibold">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500 text-xl font-semibold">{error}</div>;

  return (
    <div className="container mx-auto p-6 md:p-8">
      <ToastContainer />
      <div className="flex flex-col md:flex-row">
        {/* Image Gallery */}
        <div className="w-full md:w-1/3 flex flex-col items-start">
          <div className="w-full mb-4 relative ">
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: product.title,
                    isFluidWidth: true,
                    src: selectedImage,
                  },
                  largeImage: {
                    src: selectedImage,
                    width: 900,
                    height: 1800,
                  },
                  lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
                  enlargedImageContainerDimensions: {
                    width: '200%',
                    height: '100%',
                  },
                  enlargedImagePosition: "beside", // Ensure correct positioning
                  isHintEnabled: true,
                  hintTextMouse: "Hover to Zoom",
                  shouldUsePositiveSpaceLens: true,
                  enlargedImagePortalId: "zoom-portal", // Use portal rendering
                  isEnlargedImagePortalEnabledForTouch: true,
                }}
              />
              <div id="zoom-portal" className=' absolute top-0 left-[25rem] bg-gray-100 rounded-lg'></div>
            </div>
          </div>
          <div className="w-full flex  gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="cursor-pointer border border-gray-300 rounded-lg overflow-hidden"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-24 object-contain transition-transform duration-300 transform hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-2/3 md:pl-8 mt-6 md:mt-0">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-gray-900 mb-4">${product.price}</p>
          <p className="text-lg font-medium text-gray-700 mb-4">Brand: <span className="font-normal">{product.brand}</span></p>
          <p className="text-lg font-medium text-gray-700 mb-4">SKU: <span className="font-normal">{product.sku}</span></p>
          <p className="text-lg font-medium text-gray-700 mb-4">Stock: <span className="font-normal">{product.stock}</span></p>
          <p className="text-lg font-medium text-gray-700 mb-6">Rating: <span className="font-normal">{product.rating}</span></p>
          <div className="flex gap-4 mb-6">
            <button
              className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              onClick={() => toast.success('Added to cart!')}
            >
              Add to Cart
            </button>
            <button
              className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
              onClick={() => toast.info('Added to wishlist!')}
            >
              Add to Wishlist
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Product Details:</h2>
            <p className="text-gray-700 mb-1">Weight: <span className="font-normal">{product.weight} kg</span></p>
            <p className="text-gray-700 mb-1">Dimensions: <span className="font-normal">{product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth} cm</span></p>
            <p className="text-gray-700 mb-1">Warranty: <span className="font-normal">{product.warrantyInformation}</span></p>
            <p className="text-gray-700 mb-1">Shipping Info: <span className="font-normal">{product.shippingInformation}</span></p>
            <p className="text-gray-700">Return Policy: <span className="font-normal">{product.returnPolicy}</span></p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Tags:</h2>
            <ul className="list-disc list-inside text-gray-700">
              {product.tags.map(tag => (
                <li key={tag} className="mb-1">{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
