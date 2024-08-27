import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Rating } from '@mui/material';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEmail, setReviewerEmail] = useState('');

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      rating,
      comment,
      reviewerName,
      reviewerEmail,
    };

    try {
      const response = await axios.post(`/api/products/${productId}/reviews`, payload);
      if (response.data.success) {
        toast.success('Review submitted successfully!');
        onReviewSubmitted(); // Refresh product reviews after submission
        // Reset form fields
        setRating(0);
        setComment('');
        setReviewerName('');
        setReviewerEmail('');
      }
    } catch (error) {
      console.log(error.message);
      toast.error('Failed to submit review.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-semibold mb-4">Leave a Review</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
        <div className="flex items-center">
          <Rating
            name="product-rating"
            value={rating}
            onChange={handleRatingChange}
            size="large" // Adjust size as needed
            precision={0.5} // Allows for half-star ratings
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded"
          rows="3"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
        <input
          type="text"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
        <input
          type="email"
          value={reviewerEmail}
          onChange={(e) => setReviewerEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
