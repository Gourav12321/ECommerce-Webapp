import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { MdFavoriteBorder } from 'react-icons/md';
import {  toast } from 'react-toastify';
const WishlistButton = ({ product }) => {

  const user = useSelector((state) => state.user.user);

  const handleAddToWishlist = async () => {
    try {
      await axios.post('/api/wishlist', { email: user.email, productId: product });
      toast.success('Added to Wishlist!')
    } catch (error) {
      toast.error('Error adding to wishlist:', error);
    }
  };

  return (
    <div className="relative ">
      
        <button
          onClick={handleAddToWishlist}
          className=" py-2 px-4 rounded"
        >
          <MdFavoriteBorder className="inline-block mr-2" />
          Add to Wishlist
        </button>
      </div>
  );
};

export default WishlistButton;
