import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SetupPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/sign-in');
    }
  }, [email, navigate]);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic password validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await axios.post('/api/user/setup-password', { email, password });
      
      if (response.data.success) {
        navigate('/sign-in'); // Redirect to home page or next step
      } else {
        setError('Password setup failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during password setup. Please try again.');
      console.error('Error during password setup:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setup-password">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="password-input"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div>
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Setting Password...' : 'Set Password'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SetupPassword;
