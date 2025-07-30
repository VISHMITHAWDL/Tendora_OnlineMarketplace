import React, { useState ,useCallback} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Uncomment when implementing redirect after login
import { setLoading } from '../../store/features/Common';
import { loginAPI } from '../../api/Authentications/Authentications';
import { saveToken } from '../../utils/Jwt_helper';


const Login = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Uncomment when implementing redirect after login

  const onSubmit= useCallback((e)=>{
    e.preventDefault();
    setErrors({});
    
    // Validate form inputs
    const newErrors = {};
    if (!formData.userName) {
      newErrors.userName = "Username or email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    dispatch(setLoading(true));
    loginAPI(formData).then(res=>{
        if(res?.token){
          saveToken(res?.token);
          navigate('/')
        }
        else{
          setErrors({general: "Something went wrong!"});
        }
    }).catch(err=>{
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.status === 401) {
          setErrors({general: "Invalid username or password. Please try again."});
        } else if (err.response.status === 403) {
          setErrors({general: "Your account has not been verified yet."});
        } else {
          setErrors({general: "Server error. Please try again later."});
        }
      } else if (err.request) {
        // The request was made but no response was received
        setErrors({general: "No response from server. Please check your internet connection."});
      } else {
        // Something happened in setting up the request
        setErrors({general: "An error occurred. Please try again."});
      }
    }).finally(()=>{
      dispatch(setLoading(false));
    });


  },[dispatch, navigate, formData]);

    
    const handleOnChange = useCallback((e)=>{
        e.persist();
        setFormData(formData=>({
        ...formData,
        [e.target.name]:e.target?.value,
        }))
    },[]);

  return (
    <div className="min-h-screen bg-[#171717] text-[#EDEDED]">
        <div className="max-w-md mx-auto  px-4 py-8">
            <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-[#AAAAAA]">Sign in to your account to continue</p>
            </div>
            
            <form onSubmit={onSubmit} className="space-y-6">
                <div>
                    <label htmlFor="userName" className="block text-sm font-medium mb-2">
                    Email/Username
                    </label>
                    <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleOnChange}
                    className={`w-full px-4 py-3 rounded-md bg-[#252525] border ${
                        errors.userName ? 'border-red-500' : 'border-[#444444]'
                    } focus:outline-none focus:ring-2 focus:ring-[#DA0037] transition duration-200`}
                    placeholder="your username or email"
                    />
                    {errors.userName && (
                    <p className="mt-1 text-sm text-red-500">{errors.userName}</p>
                    )}
                </div>
                
                <div>
                    <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="block text-sm font-medium">
                        Password
                    </label>
                    <Link to="/forgot-password" className="text-sm text-[#DA0037] hover:underline">
                        Forgot password?
                    </Link>
                    </div>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    className={`w-full px-4 py-3 rounded-md bg-[#252525] border ${
                        errors.password ? 'border-red-500' : 'border-[#444444]'
                    } focus:outline-none focus:ring-2 focus:ring-[#DA0037] transition duration-200`}
                    placeholder="••••••••"
                    />
                    {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                    )}
                </div>
                
                
                {errors.general && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{errors.general}</span>
                    </div>
                )}
                
                <button
                    type="submit"
                    className="w-full bg-[#DA0037] text-white py-3 rounded-md font-medium hover:bg-[#9b0028] transition duration-300"
                >
                    Sign In
                </button>
                
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#444444]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-[#171717] text-[#AAAAAA]">Or continue with</span>
                    </div>
                </div>
                
                <button
                    type="button"
                    onClick={() => console.log('Google sign-in')}
                    className="w-full flex items-center justify-center gap-3 bg-[#252525] text-white py-3 px-4 rounded-md font-medium border border-[#444444] hover:bg-[#333333] transition duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                    </svg>
                    Continue with Google
                </button>
            </form>
                
            <div className="text-center mt-8">
                <p className="text-[#AAAAAA]">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-[#DA0037] hover:underline font-medium">
                    Create one
                    </Link>
                </p>
            </div>

        </div>
    </div>
  );
};

export default Login;