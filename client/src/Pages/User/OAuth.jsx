import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../../Firebase.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function OAuth() {
  const navigate = useNavigate();
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const displayName = result.user.displayName || "";
  
      const payload = {
        fullName : displayName,
        email: result.user.email,
        profile: result.user.photoURL
      };
  
      // Log the payload to ensure correct data
  
      // Send data to the backend for storage
      const response = await axios.post('/api/user/oAuth', payload);
  
  
      if (response.data.success) {
      toast.success("SignUp Successfully Please Setup your Password");
        navigate('/setup-password', { state: { email: result.user.email } });
      } else {
        toast.error('OAuth registration failed. Please try again.');
      }
    } catch (error) {
      toast.error("Error in OAuth:", error.response?.data || error.message);
    }
  };
  

  return (
    <div>
      <button
        type='button'
        className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-gray-300 shadow-lg text-sm font-medium rounded-md '
        onClick={handleGoogle}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png" alt="google" className='w-7 h-7 mr-2' />
        Continue With Google
      </button>
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
  );
}

export default OAuth;
