import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { storage } from '../../Firebase.js'; // Import storage from your Firebase configuration

const UploadProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    price: '',
    discountPercentage: '',
    rating: '',
    stock: '',
    tags: '',
    brand: '',
    sku: '',
    weight: '',
    dimensions: {
      width: '',
      height: '',
      depth: ''
    },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    returnPolicy: '',
    minimumOrderQuantity: '',
    thumbnail: '',
    images: []
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [imageLinks, setImageLinks] = useState([]);
  const [imageLink, setImageLink] = useState('');
  const [isImageUpload, setIsImageUpload] = useState(true); // Toggle between upload and link
  const [thumbnailUpload, setThumbnailUpload] = useState(true); // Toggle for thumbnail upload
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/categories');
        setCategories(data.categories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setProduct((prevProduct) => ({ ...prevProduct, category: categoryId }));
    
    try {
      const { data } = await axios.get(`/api/categories/${categoryId}/subcategories`);
      setSubcategories(data.subcategories);
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
    }
  };

  const handleSubcategoryChange = (e) => {
    setProduct((prevProduct) => ({ ...prevProduct, subcategory: e.target.value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [key, nestedKey] = name.split('.');
      setProduct((prevProduct) => ({
        ...prevProduct,
        [key]: {
          ...prevProduct[key],
          [nestedKey]: value
        }
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const urls = [];
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        urls.push(reader.result);
        setImageURLs(urls);
      };

      reader.readAsDataURL(file);
      newImages.push(file);
    }

    setSelectedImages(newImages);
  };

  const handleImageLinkChange = (e) => {
    setImageLink(e.target.value);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setThumbnailURL(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setThumbnailImage(file);
    }
  };

  const handleThumbnailLinkChange = (e) => {
    setThumbnailURL(e.target.value);
  };

  const handleUpload = async () => {
    try {
      // Handle thumbnail upload
      let thumbnailUrl = '';

      if (thumbnailUpload && thumbnailImage) {
        const storageRef = storage.ref(`thumbnails/${thumbnailImage.name}`);
        await storageRef.put(thumbnailImage);
        thumbnailUrl = await storageRef.getDownloadURL();
      } else {
        thumbnailUrl = thumbnailURL;
      }

      // Handle image uploads
      let imageUrls = [];

      if (isImageUpload) {
        imageUrls = await Promise.all(selectedImages.map(async (file) => {
          const storageRef = storage.ref(`images/${file.name}`);
          await storageRef.put(file);
          return storageRef.getDownloadURL();
        }));
      } else {
        imageUrls = imageLinks;
      }

      // Prepare product data
      const productData = { ...product, thumbnail: thumbnailUrl, images: imageUrls };

      // Send product data to your backend
      await axios.post('/api/products', productData);
      alert('Product uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to upload product.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Product</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter product title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter product description"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="subcategory">Subcategory</label>
            <select
              id="subcategory"
              name="subcategory"
              value={product.subcategory}
              onChange={handleSubcategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select a subcategory</option>
              {subcategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter product price"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="discountPercentage">Discount Percentage</label>
            <input
              type="number"
              id="discountPercentage"
              name="discountPercentage"
              value={product.discountPercentage}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter discount percentage"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="rating">Rating</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={product.rating}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter product rating"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter stock quantity"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={product.tags}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter product tags"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="brand">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter brand"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="sku">SKU</label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={product.sku}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter SKU"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="weight">Weight</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={product.weight}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter weight"
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block text-gray-700 mb-2" htmlFor="dimensions">Dimensions</label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="width">Width</label>
                <input
                  type="number"
                  id="width"
                  name="dimensions.width"
                  value={product.dimensions.width}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Width"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="height">Height</label>
                <input
                  type="number"
                  id="height"
                  name="dimensions.height"
                  value={product.dimensions.height}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Height"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="depth">Depth</label>
                <input
                  type="number"
                  id="depth"
                  name="dimensions.depth"
                  value={product.dimensions.depth}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Depth"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="warrantyInformation">Warranty Information</label>
            <textarea
              id="warrantyInformation"
              name="warrantyInformation"
              value={product.warrantyInformation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter warranty information"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="shippingInformation">Shipping Information</label>
            <textarea
              id="shippingInformation"
              name="shippingInformation"
              value={product.shippingInformation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter shipping information"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="availabilityStatus">Availability Status</label>
            <input
              type="text"
              id="availabilityStatus"
              name="availabilityStatus"
              value={product.availabilityStatus}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter availability status"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="returnPolicy">Return Policy</label>
            <textarea
              id="returnPolicy"
              name="returnPolicy"
              value={product.returnPolicy}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter return policy"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="minimumOrderQuantity">Minimum Order Quantity</label>
            <input
              type="number"
              id="minimumOrderQuantity"
              name="minimumOrderQuantity"
              value={product.minimumOrderQuantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter minimum order quantity"
            />
          </div>
          </div>

 {/* Thumbnail Section */}
 <div className="mb-4">
          <label className="block text-gray-700 mb-2">Thumbnail</label>
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => setThumbnailUpload(true)}
              className={`px-4 py-2 rounded-lg ${thumbnailUpload ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Upload Thumbnail
            </button>
            <button
              type="button"
              onClick={() => setThumbnailUpload(false)}
              className={`px-4 py-2 rounded-lg ${!thumbnailUpload ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Thumbnail URL
            </button>
          </div>

          {thumbnailUpload ? (
            <input
              type="file"
              onChange={handleThumbnailChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          ) : (
            <input
              type="text"
              value={thumbnailURL}
              onChange={handleThumbnailLinkChange}
              placeholder="Enter thumbnail URL"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          )}

          {thumbnailURL && !thumbnailUpload && (
            <img
              src={thumbnailURL}
              alt="Thumbnail"
              className="w-32 h-32 object-cover rounded-lg mt-4"
            />
          )}

          {thumbnailImage && thumbnailUpload && (
            <img
              src={thumbnailURL}
              alt="Thumbnail Preview"
              className="w-32 h-32 object-cover rounded-lg mt-4"
            />
          )}
        </div>

        {/* Images Section */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Upload Images</label>
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => setIsImageUpload(true)}
              className={`px-4 py-2 rounded-lg ${isImageUpload ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Upload Images
            </button>
            <button
              type="button"
              onClick={() => setIsImageUpload(false)}
              className={`px-4 py-2 rounded-lg ${!isImageUpload ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Image URLs
            </button>
          </div>

          {isImageUpload ? (
            <>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-wrap gap-4 mt-4">
                {imageURLs.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Selected ${index}`}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </>
          ) : (
            <div>
              <input
                type="text"
                value={imageLink}
                onChange={handleImageLinkChange}
                placeholder="Enter image URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              {imageLink && (
                <div className="mt-4">
                  <img
                    src={imageLink}
                    alt="Provided"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => setImageLinks((prevLinks) => [...prevLinks, imageLink])}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Add Image URL
              </button>
              <div className="flex flex-wrap gap-4 mt-4">
                {imageLinks.map((link, index) => (
                  <img
                    key={index}
                    src={link}
                    alt={`URL ${index}`}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleUpload}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          Upload Product
        </button>
      </div>
    </div>
  );
};

export default UploadProduct;