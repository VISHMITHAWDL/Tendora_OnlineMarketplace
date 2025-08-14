import React from 'react'
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';  
import { Link } from 'react-router-dom';
import { setLoading } from '../../store/features/Common';
import { verifyAPI } from './Authentications';



const Verifycode = ({email}) => {
    
    
    const [values,setValues]= useState({
        userName:email,
        code:''
    });

    const [error,setError] =useState('');
    const dispatch = useDispatch();
    const [message,setMessage] = useState('');

    const onSubmit= useCallback((e)=>{
        e.preventDefault();
        setError('');
        dispatch(setLoading(true));
        verifyAPI(values).then(res=>{
        setMessage('Thank you! Your email has been successfully verified. You can now log in to your account.')
        }).catch(err=>{
        setError('The verification code you entered is incorrect or has expired.');
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
        <div className="min-h-screen flex items-center justify-center bg-[#171717] text-[#EDEDED]">
            <div className="max-w-md w-full p-6 bg-[#222222] rounded-lg shadow-lg border border-[#444444]">
                <div className="flex justify-center mb-8">
                    <h1 className="text-2xl font-bold text-[#EDEDED]">Verify Your Email</h1>
                </div>
                
                {message ? (
                    <div className="mb-4 p-4 bg-[#0B3C17] text-[#EDEDED] rounded-md border border-[#15803d]">
                        <p>{message}</p>
                        <div className="mt-4 text-center">
                            <Link to="/login" className="inline-block px-5 py-3 bg-[#DA0037] text-white font-medium rounded-lg hover:bg-[#B8002F] transition-colors">
                                Go to Login
                            </Link>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <p className="text-[#EDEDED] mb-4">
                                A verification code has been sent to <span className="font-medium text-[#DA0037]">{email}</span>.
                                Please enter the code below to verify your email address.
                            </p>
                            
                            {error && (
                                <div className="mb-4 p-3 bg-[#2D0404] text-[#EDEDED] rounded-md border border-[#DA0037]">
                                    {error}
                                </div>
                            )}
                            
                            <label className="block text-[#EDEDED] text-sm font-bold mb-2" htmlFor="code">
                                Verification Code
                            </label>
                            <input
                                className="w-full px-3 py-2 bg-[#333333] text-[#EDEDED] border border-[#444444] rounded-md focus:outline-none focus:ring-2 focus:ring-[#DA0037] focus:border-[#DA0037]"
                                type="text"
                                id="code"
                                name="code"
                                value={values.code}
                                onChange={handleOnChange}
                                placeholder="Enter verification code"
                                required
                            />
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <button
                                className="w-full bg-[#DA0037] text-white font-bold py-2 px-4 rounded-md hover:bg-[#B8002F] focus:outline-none focus:ring-2 focus:ring-[#DA0037] focus:ring-opacity-50 transition-colors"
                                type="submit"
                            >
                                Verify Email
                            </button>
                        </div>
                    </form>
                )}
                
                <div className="mt-6 text-center">
                    <p className="text-sm text-[#EDEDED]">
                        Didn't receive a code? <Link to="#" className="text-[#DA0037] hover:text-[#FF5C7F]">Resend Code</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Verifycode