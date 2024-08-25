import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../Firebase';
import { FaCamera, FaEye, FaEyeSlash } from 'react-icons/fa';
import { setUser } from '../Redux/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);
  
  const [formData, setFormData] = useState({
    fullName: user ? user.fullName : '',
    email: user ? user.email : '',
    currentPassword: '',
    newPassword: '',
    profile: user ? user.profile : '',
  });
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [passwordError, setPasswordError] = useState({ current: '', new: '' });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
        currentPassword: '',
        newPassword: '',
        profile: user.profile,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const uploadFile = (file) => {
    setUploading(true);
    const storageRef = ref(storage, `${user.email}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Optional: Handle progress
      },
      (error) => {
        setError('Failed to upload image');
        toast.error('Failed to upload image');
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profile: downloadURL });
          setUploading(false);
          toast.success('Photo uploaded successfully. Hit the update button to save changes.');
        });
      }
    );
  };

  const handleProfileClick = () => {
    fileInputRef.current.click();
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setPasswordError({ current: '', new: '' });

  if (formData.currentPassword && !formData.newPassword) {
    setPasswordError((prev) => ({ ...prev, new: 'Enter both fields' }));
    return;
  }

  if (!formData.currentPassword && formData.newPassword) {
    setPasswordError((prev) => ({ ...prev, current: 'Enter both fields' }));
    return;
  }

  try {
    const response = await axios.put(`/api/user/edit-user`, formData);
    dispatch(setUser({
      fullName: response.data.fullName,
      email: response.data.email,
      profile: response.data.profile,
      role : response.data.role
    }));
    toast.success('Profile updated successfully!');
  } catch (err) {
    setError(err.response?.data?.message || 'An error occurred');
    toast.error(err.response?.data?.message || 'An error occurred');
  }
};
  if (!user) {
    return null; // or a loading spinner or placeholder
  }

  return (
    <section className='profile'>
      <div className='flex flex-col items-center justify-center'>
        <div className='relative' onClick={handleProfileClick}>
          <img
            src={formData.profile}
            alt='profile'
            className='rounded-full mt-10 mb-5 cursor-pointer hover:opacity-80 transition-opacity duration-200 w-[8rem] h-[8rem]'
          />
          <FaCamera className='absolute bottom-0 right-0 text-white bg-blue-500 p-2 rounded-full text-xl cursor-pointer' />
        </div>
        <input
          type='file'
          accept='image/*'
          ref={fileInputRef}
          onChange={handleFileChange}
          className='hidden'
        />
        <div>
          <h2 className='text-xl font-bold'>{formData.fullName}</h2>
        </div>
        <div className='my-10 w-full'>
          <form className='flex flex-col gap-5 w-1/2 mx-auto' onSubmit={handleSubmit}>
           
            <input
              type='text'
              name='fullName'
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder='Enter Full Name'
              className='text-center border shadow-lg rounded-lg px-12 py-2'
            />
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Enter Email'
              className='text-center border shadow-lg rounded-lg px-12 py-2'
              disabled
            />
            <div className='relative'>
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                name='currentPassword'
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder='Current Password'
                className={`text-center border shadow-lg rounded-lg px-12 py-2 w-full ${passwordError.current ? 'border-red-500' : ''}`}
              />
              {showCurrentPassword ? (
                <FaEyeSlash
                  onClick={() => setShowCurrentPassword(false)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                />
              ) : (
                <FaEye
                  onClick={() => setShowCurrentPassword(true)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                />
              )}
            </div>
            <div className='relative'>
              <input
                type={showNewPassword ? 'text' : 'password'}
                name='newPassword'
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder='New Password'
                className={`text-center border shadow-lg rounded-lg px-12 py-2 w-full  ${passwordError.new ? 'border-red-500' : ''}`}
              />
              {showNewPassword ? (
                <FaEyeSlash
                  onClick={() => setShowNewPassword(false)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                />
              ) : (
                <FaEye
                  onClick={() => setShowNewPassword()}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                />
              )}
            </div>
            <button
              type='submit'
              className='bg-blue-500 py-2 rounded-lg text-white focus:text-black font-bold'
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Update'}
            </button>
          </form>
        </div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
      </div>
    </section>
  );
}

export default Profile;
