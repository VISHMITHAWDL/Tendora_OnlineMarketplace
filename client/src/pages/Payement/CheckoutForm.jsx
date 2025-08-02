import React from 'react'
import {  PaymentElement } from '@stripe/react-stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/features/Cart';
import { useState } from 'react';
import { placeOrderAPI } from '../../api/Oder/Order';
import { createOrderRequest } from '../../utils/Order_utils';
import { setLoading } from '../../store/features/Common';
import { useCallback } from 'react';




const CheckoutForm = ({userId,addressId}) => {

  const stripe= useStripe();
  const elements = useElements();
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [error,setError] =useState('');
  const [paymentSuccess,setPaymentSuccess] = useState(false);
  const [orderResponse,setOrderResponse] = useState();


  const handleSubmit = useCallback(async (event)=>{

    event?.preventDefault();

    const orderRequest = createOrderRequest(cartItems,userId,addressId);
    console.log("Order Request",orderRequest);
    dispatch(setLoading(true));
    setError('');
    setOrderResponse({});

    const {error} = await elements.submit();
    if (error?.message) {
      setError(error?.message);
      dispatch(setLoading(false));
      return;
    }

    
    if(elements){
    placeOrderAPI(orderRequest).then(async res=>{
        setOrderResponse(res);
        stripe.confirmPayment({
            elements,
            clientSecret: res?.credentials?.client_secret,
            
            confirmParams:{
                payment_method:'pm_card_visa',
                return_url:'http://localhost:5173/confirmpayment'
            }
        }).then(res=>{
            console.log("Response ",res);
        })

        
        
    }).catch(err=>{

    }).finally(()=>{
        dispatch(setLoading(false));
    })

    }


  },[addressId, cartItems, dispatch, elements, stripe, userId]);

  
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Payment Details</h3>
        <p className="text-sm text-gray-600 mt-1">Complete your secure payment</p>
      </div>
      
      <form className="flex flex-col space-y-6 p-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Card Information</label>
          <div className="p-3 border border-gray-300 rounded-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
            <PaymentElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#374151',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    '::placeholder': {
                      color: '#9CA3AF',
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={!stripe} 
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg 
                     hover:from-blue-700 hover:to-blue-800 
                     disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                     shadow-md hover:shadow-lg"
        >
          {!stripe ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              Complete Payment
            </span>
          )}
        </button>

        {error && (
          <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          <span>Secured by Stripe</span>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm