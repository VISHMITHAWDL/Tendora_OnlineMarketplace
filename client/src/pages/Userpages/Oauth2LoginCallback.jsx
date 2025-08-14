import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveToken } from '../../utils/Jwt_helper';


const OAuth2LoginCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(()=>{
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      console.log("OAuth2 token received:", token);

      if(token){
          saveToken(token);
          console.log("Token saved, navigating to homepage");
          setTimeout(() => {
            navigate('/');
          }, 100); // Small delay to ensure token is saved before navigation
      }
      else{
          console.log("No token received, redirecting to login");
          setError('No authentication token received');
          navigate('/login');
      }
    } catch (err) {
      console.error("Error in OAuth callback:", err);
      setError('Authentication error');
      navigate('/login');
    }
  },[navigate])
  return (
    <div className="oauth-callback-container">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Processing authentication, please wait...</p>
      </div>
    </div>
  )
}

export default OAuth2LoginCallback