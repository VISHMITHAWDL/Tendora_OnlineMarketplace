import React from 'react'
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLoading } from '../../store/features/Common';
import { registerAPI } from '../../api/Authentications/Authentications';
import Verifycode from '../../api/Authentications/Verifycode'; 
import { API_BASE_URL } from '../../api/const';



const Register = () => {

 const handleClick = useCallback(() => {
    window.location.href = API_BASE_URL + '/oauth2/authorization/google';
 }, []);

 


 const [values,setValues] =useState({
    email:'',
    password: '',
    firstName: "",
    lastName: "", 
    phone:'',
  });

  const [error,setError] =useState('');
  const dispatch = useDispatch();
  const [enableVerify,setEnableVerify] =useState(false);

  const onSubmit= useCallback((e)=>{
    e.preventDefault();
    setError('');
    dispatch(setLoading(true));
    registerAPI(values).then(res=>{
        if(res?.code === 200){
          setEnableVerify(true);
        }
    }).catch(err=>{
      setError("Invalid or Email already exist!")
    }).finally(()=>{
      dispatch(setLoading(false));
    })


  },[dispatch, values]);

  const handleOnChange = useCallback((e)=>{
    e.persist();
    setValues(values=>({
      ...values,
      [e.target.name]:e.target?.value,
    }))
  },[]);
  return (
    <div className="min-h-screen bg-[#171717] text-[#EDEDED]">
        <div className="max-w-md mx-auto px-4 py-8">
            <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
            <p className="text-[#AAAAAA]">Join Tendora to start shopping</p>
            </div>
        
        {enableVerify ? (
         
            <Verifycode email={values.email} />
         
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleOnChange}
                  className="w-full px-4 py-3 rounded-md bg-[#252525] border border-[#444444] focus:outline-none focus:ring-2 focus:ring-[#DA0037] transition duration-200"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleOnChange}
                  className="w-full px-4 py-3 rounded-md bg-[#252525] border border-[#444444] focus:outline-none focus:ring-2 focus:ring-[#DA0037] transition duration-200"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleOnChange}
                className="w-full px-4 py-3 rounded-md bg-[#252525] border border-[#444444] focus:outline-none focus:ring-2 focus:ring-[#DA0037] transition duration-200"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={values.phone}
                onChange={handleOnChange}
                className="w-full px-4 py-3 rounded-md bg-[#252525] border border-[#444444] focus:outline-none focus:ring-2 focus:ring-[#DA0037] transition duration-200"
                placeholder="+1 234 567 8900"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleOnChange}
                className="w-full px-4 py-3 rounded-md bg-[#252525] border border-[#444444] focus:outline-none focus:ring-2 focus:ring-[#DA0037] transition duration-200"
                placeholder="••••••••"
                required
              />
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-[#DA0037] text-white py-3 rounded-md font-medium hover:bg-[#9b0028] transition duration-300"
            >
              Create Account
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
              onClick={handleClick}
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
        )}
        
            <div className="text-center mt-8">
                <p className="text-[#AAAAAA]">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#DA0037] hover:underline font-medium">
                    Sign in
                    </Link>
                </p>
            </div>
        </div>
    </div>
  );
}

export default Register