import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {useSelector } from 'react-redux';

const AddressForm = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [navigate, user]); 

  if(user.password === false){
    navigate('/setup-password',{ state: { email: user.email } })
  }

  const [address, setAddress] = useState({
    phoneNumber: '',
    houseNo: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address.phoneNumber || !address.city || !address.state || !address.pincode) {
      alert('Please fill out all required fields.');
      return;
    }
    const email = location.state?.email;

    try {
      const response = await axios.post('/api/user/userAddress', { email, address });
      if (response.data.success) {
        alert('Address added successfully');
        navigate('/sign-in');
      } else {
        alert('Failed to add address. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting address:', error);
      alert('Error: ' + (error.response?.data?.message || 'An unknown error occurred'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Address form fields */}
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={address.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>House No:</label>
        <input
          type="text"
          name="houseNo"
          value={address.houseNo}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Landmark:</label>
        <input
          type="text"
          name="landmark"
          value={address.landmark}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={address.city}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          name="state"
          value={address.state}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Pincode:</label>
        <input
          type="text"
          name="pincode"
          value={address.pincode}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit Address</button>
    </form>
  );
};

export default AddressForm;
