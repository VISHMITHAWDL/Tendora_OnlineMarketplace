import React from 'react'
import { selectCartItems } from '../../store/features/Cart'
import { useSelector } from 'react-redux'
import { useState, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../store/features/Common'
import { useNavigate } from 'react-router-dom'
import { fetchUserDetails } from '../../api/userInfo'
import PlacePayment from './PlacePayment'



 

const Checkout = () => {
    
    const cart = useSelector(selectCartItems)
    const dispatch = useDispatch();
    const [userInfo,setUserInfo] = useState([]);
    const navigate = useNavigate();
    const [paymentMethod,setPaymentMethod] = useState('');

    const subTotal = useMemo(()=>{
        let value = 0;
        cart?.forEach(element => {
        value += element?.subTotal 
        });
        return value?.toFixed(2);
    },[cart]);

    useEffect(()=>{
        dispatch(setLoading(true))
        fetchUserDetails().then(res=>{
        setUserInfo(res);
        console.log(res);
        }).catch(err=>{
          console.error(err);
        }).finally(()=>{
        dispatch(setLoading(false))
        })
    },[dispatch]);

  return (
    <div className='bg-[#171717] text-[#EDEDED] min-h-screen p-8'>
      <div className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-8'>
        <div className='lg:w-[70%] space-y-8'>
          {/* Delivery Address Section */}
          <div className='bg-[#181818] rounded-xl p-6 border border-[#444444]'>
            <h2 className='text-xl font-bold text-[#EDEDED] mb-4'>Delivery Address</h2>
            {userInfo?.addressList && (
              <div className='bg-[#171717] rounded-lg p-4 border border-[#444444]'>
                <p className='font-semibold text-[#EDEDED] mb-2'>{userInfo?.addressList?.[0]?.name}</p>
                <p className='text-[#EDEDED]/80'>{userInfo?.addressList?.[0]?.street}</p>
                <p className='text-[#EDEDED]/80'>{userInfo?.addressList?.[0]?.city}, {userInfo?.addressList?.[0]?.state} {userInfo?.addressList?.[0]?.zipCode}</p>
                <p className='text-[#EDEDED]/70 mt-2'>{userInfo?.addressList?.[0]?.phoneNumber}</p>
              </div>
            )}
          </div>

          {/* Delivery Date Section */}
          {/* <div className='bg-[#181818] rounded-xl p-6 border border-[#444444]'>
            <h2 className='text-xl font-bold text-[#EDEDED] mb-4'>Choose Delivery Date</h2>
            <p className='text-[#EDEDED]/80 mb-4'>Select a day</p>
            <div className='flex gap-4'>
              <div className='w-20 h-12 flex items-center justify-center border border-[#444444] rounded-lg cursor-pointer hover:border-[#DA0037] hover:bg-[#DA0037]/10 transition-all bg-[#171717] text-[#EDEDED]'>
                <p className='text-sm font-medium'>Oct 5</p>
              </div>
              <div className='w-20 h-12 flex items-center justify-center border border-[#444444] rounded-lg cursor-pointer hover:border-[#DA0037] hover:bg-[#DA0037]/10 transition-all bg-[#171717] text-[#EDEDED]'>
                <p className='text-sm font-medium'>Oct 8</p>
              </div>
            </div>
          </div> */}
          {/* Payment Method Section */}
          <div className='bg-[#181818] rounded-xl p-6 border border-[#444444]'>
            <h2 className='text-xl font-bold text-[#EDEDED] mb-4'>Payment Method</h2>
            <div className='space-y-4'>
              <label className='flex items-center gap-3 p-4 rounded-lg border border-[#444444] hover:border-[#DA0037] transition-colors cursor-pointer bg-[#171717]'>
                <input 
                  type='radio' 
                  name='payment_method' 
                  value='CARD' 
                  onChange={() => setPaymentMethod('CARD')}
                  className='accent-[#DA0037]'
                />
                <span className='text-[#EDEDED]'>Credit/Debit Card</span>
              </label>
              
              <label className='flex items-center gap-3 p-4 rounded-lg border border-[#444444] hover:border-[#DA0037] transition-colors cursor-pointer bg-[#171717]'>
                <input 
                  type='radio' 
                  name='payment_method' 
                  value='COD' 
                  onChange={() => setPaymentMethod('COD')}
                  className='accent-[#DA0037]'
                />
                <span className='text-[#EDEDED]'>Cash on Delivery</span>
              </label>
              
              <label className='flex items-center gap-3 p-4 rounded-lg border border-[#444444] hover:border-[#DA0037] transition-colors cursor-pointer bg-[#171717]'>
                <input 
                  type='radio' 
                  name='payment_method' 
                  value='UPI' 
                  onChange={() => setPaymentMethod('UPI')}
                  className='accent-[#DA0037]'
                />
                <span className='text-[#EDEDED]'>UPI/Wallet</span>
              </label>
            </div>
          </div>

          {/* Payment Component or Pay Button */}
          {paymentMethod === 'CARD' && <PlacePayment userId={userInfo?.id} addressId={userInfo?.addressList?.[0]?.id}/>}

          {paymentMethod !== 'CARD' && paymentMethod && (
            <button 
              className='w-full max-w-xs h-12 bg-[#DA0037] hover:bg-[#b8002c] transition-colors rounded-lg font-medium text-[#EDEDED] shadow-lg'
              onClick={() => navigate('/payment')}
            >
              Pay Now
            </button>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className='lg:w-[30%]'>
          <div className='bg-[#181818] rounded-xl p-6 border border-[#444444] sticky top-8'>
            <h2 className='text-xl font-bold text-[#EDEDED] mb-6'>Order Summary</h2>
            <div className='space-y-4'>
              <div className='flex justify-between items-center text-[#EDEDED]/80'>
                <span>Items Count</span>
                <span className='font-medium text-[#EDEDED]'>{cart?.length}</span>
              </div>
              
              <div className='flex justify-between items-center text-[#EDEDED]/80'>
                <span>Subtotal</span>
                <span className='font-medium text-[#EDEDED]'>${subTotal}</span>
              </div>
              
              <div className='flex justify-between items-center text-[#EDEDED]/80'>
                <span>Shipping</span>
                <span className='font-medium text-[#DA0037]'>FREE</span>
              </div>
              
              <hr className='border-[#444444] my-4'/>
              
              <div className='flex justify-between items-center text-lg font-bold'>
                <span className='text-[#EDEDED]'>Total Amount</span>
                <span className='text-[#DA0037]'>${subTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout