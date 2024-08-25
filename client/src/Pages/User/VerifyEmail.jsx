import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    
    const verifyEmail = async () => {
      try {
        if (user) {
          navigate('/');
        }

        if(!token){
          navigate('/sign-in');
        }
        const response = await axios.get(`/api/user/verify-email?token=${token}`);
        if (response.data.success) {
          // navigate('/setup-password', { state: { email: response.data.email } });
          navigate('/sign-in');
        } else {
          alert('Email verification failed. Please try again.');
        }
      } catch (error) {
        console.error('Error verifying email:', error);
      }
    };

    verifyEmail();
  }, [token, navigate, user]);

  return (
    <div>
      Verifying email...
    </div>
  );
}

export default VerifyEmail;
