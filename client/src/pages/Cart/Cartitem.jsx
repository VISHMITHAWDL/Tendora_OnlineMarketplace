import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../store/features/Cart'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { delteItemFromCartAction, updateItemToCartAction } from '../../store/action/cartAction'
import { useCallback, useMemo, useState } from 'react'
import Modal from 'react-modal'
import { isTokenValid } from '../../utils/Jwt_helper'

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '440px',
    padding: '0',
    border: 'none',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    background: '#171717'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(4px)'
  }
}



const Cartitem = () => {
  
  const cart = useSelector(selectCartItems)

  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [deleteItem,setDeleteItem] = useState({}); 
  const navigate = useNavigate();

  const onChangeQuantity = useCallback((value,productId,variantId)=>{

        console.log("Received ",value);

        dispatch(updateItemToCartAction({
            productId: productId,
            variant_id: variantId,
            quantity: value
        }))
        

    },[dispatch]);

  const onDeleteProduct= useCallback((productId,variantId)=>{
        setModalIsOpen(true);
        setDeleteItem({
            productId: productId,
            variantId: variantId
        })
    },[]);

  const onCloseModal = useCallback(()=>{
        setDeleteItem({});
        setModalIsOpen(false);
    },[]);

  const onDeleteItem= useCallback(()=>{
        dispatch(delteItemFromCartAction(deleteItem));
        setModalIsOpen(false);  
    },[deleteItem, dispatch]);

  const subTotal = useMemo(()=>{
        let value = 0;
        cart?.forEach(element => {
        value += element?.subTotal 
        });
        return value?.toFixed(2);
    },[cart]);


    const isLoggedIn = useMemo(()=>{
        return isTokenValid();
    },[])
    console.log("isLoggedIn ",isLoggedIn, isTokenValid());


  return (
    <div className="min-h-screen bg-[#171717]">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header Section - Matching Tendora Style */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#EDEDED] mb-2">
            <span className="text-[#DA0037]">Shopping</span> Cart
          </h1>
          <p className="text-[#EDEDED]/70">Review your items and proceed to checkout</p>
        </div>
        
        {cart && cart.length > 0 ? (
          <>
            {/* Modern Table Card with Tendora Branding */}
            <div className="bg-[#ffffff] rounded-2xl shadow-2xl border border-[#ffffff] overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full table-fixed">
                  <thead>
                    <tr className="bg-[#171717] text-[#EDEDED] border-b border-[#444444]">
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider w-2/5">Product Details</th>
                      <th className="py-4 px-6 text-center font-semibold text-sm uppercase tracking-wider w-1/8">Price</th>
                      <th className="py-4 px-6 text-center font-semibold text-sm uppercase tracking-wider w-1/6">Quantity</th>
                      <th className="py-4 px-6 text-center font-semibold text-sm uppercase tracking-wider w-1/8">Shipping</th>
                      <th className="py-4 px-6 text-center font-semibold text-sm uppercase tracking-wider w-1/8">SubTotal</th>
                      <th className="py-4 px-6 text-center font-semibold text-sm uppercase tracking-wider w-1/12">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ffffff]">
                    {cart.map((item) => (
                      <tr key={`${item.productId}-${item.variant?.id}`} 
                          className="transition-all duration-300  bg-[#EDEDED]">
                        {/* Product Details */}
                        <td className="py-6 px-6">
                          <div className="flex items-center space-x-4">
                            {item.thumbnail && (
                              <div className="relative group flex-shrink-0">
                                <img 
                                  src={item.thumbnail} 
                                  alt={item.name} 
                                  className="w-20 h-20 object-cover rounded-xl shadow-lg border-2 border-[#444444] group-hover:border-[#DA0037] transition-all duration-300" 
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-[#DA0037]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-[#171717] text-lg mb-2 truncate">{item.name}</h3>
                              <div className="space-y-2">
                                {item.variant?.color && (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm text-[#171717]/70">Color:</span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#DA0037]/20 text-[#DA0037] border border-[#DA0037]/30">
                                      {item.variant.color}
                                    </span>
                                  </div>
                                )}
                                {item.variant?.size && (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm text-[#171717]/70">Size:</span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#171717] text-[#EDEDED] border border-[#444444]">
                                      {item.variant.size}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        {/* Price */}
                        <td className="py-6 px-6 text-center">
                          <span className="text-xl font-bold text-[#171717]">
                            ${item.price?.toFixed(2)}
                          </span>
                        </td>
                        
                        {/* Quantity */}
                        <td className="py-6 px-6">
                          <div className="flex justify-center">
                            <div className="flex items-center bg-[[#EDEDED] border-2 border-[#444444] rounded-xl overflow-hidden hover:border-[#DA0037] transition-all duration-200 shadow-sm">
                              {/* Decrease Button */}
                              <button
                                onClick={() => onChangeQuantity(Math.max(1, item.quantity - 1), item.productId, item.variant?.id)}
                                disabled={item.quantity <= 1}
                                className="px-3 py-2 bg-[[#EDEDED]  text-[#171717] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:pointer-coarse:"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              
                              {/* Quantity Display */}
                              <div className="px-4 py-2 bg-[#EDEDED] min-w-[3rem] text-center">
                                <span className="text-lg font-bold text-[#171717]">{item.quantity}</span>
                              </div>
                              
                              {/* Increase Button */}
                              <button
                                onClick={() => onChangeQuantity(Math.min(item.variant?.stockQuantity || 10, item.quantity + 1), item.productId, item.variant?.id)}
                                disabled={item.quantity >= (item.variant?.stockQuantity || 10)}
                                className="px-3 py-2 bg-[#EDEDED] text-[#171717] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none ]"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          
                          {/* Stock indicator */}
                          <div className="mt-2 text-xs text-[#171717]/50 text-center">
                            {item.variant?.stockQuantity ? `${item.variant.stockQuantity} in stock` : '10+ available'}
                          </div>
                        </td>
                        
                        {/* Shipping */}
                        <td className="py-6 px-6 text-center">
                          <span className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-semibold ${
                            item.shippingCost ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-600/30' : 'bg-green-900/30 text-[#171717] border border-green-600/30'
                          }`}>
                            {item.shippingCost ? `${item.shippingCost.toFixed(2)}` : 'Free'}
                          </span>
                        </td>
                        
                        {/* Subtotal */}
                        <td className="py-6 px-6 text-center">
                          <span className="text-xl font-bold text-[#171717]">
                            ${item.subTotal?.toFixed(2)}
                          </span>
                        </td>
                        
                        {/* Action */}
                        <td className="py-6 px-6 text-center">
                          <button 
                            onClick={() => onDeleteProduct(item.productId, item.variant?.id)}
                            className="inline-flex items-center justify-center w-12 h-12 rounded-full  text-[#DA0037] hover:bg-[#DA0037] hover:text-[#EDEDED] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#DA0037] focus:ring-offset-2 focus:ring-offset-[#444444] group"
                            title="Remove item"
                          >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Section with Tendora Brand Colors */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Continue Shopping */}
              <div className="flex-1">
                <button 
                  onClick={() => navigate('/')}
                  className="inline-flex items-center px-8 py-4 border-2 border-[#444444] text-[#EDEDED] font-semibold rounded-xl hover:border-[#DA0037] hover:bg-[#444444] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#DA0037] focus:ring-offset-2 focus:ring-offset-[#171717]"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </button>
              </div>
              
              {/* Order Summary Card - Tendora Style */}
              <div className="w-full lg:w-96">
                <div className="bg-[#444444] rounded-2xl shadow-2xl border border-[#444444] p-6">
                  <h3 className="text-2xl font-bold text-[#EDEDED] mb-6">Order Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-[#171717]">
                      <span className="text-[#EDEDED]/70 font-medium">Subtotal:</span>
                      <span className="text-2xl font-bold text-[#ffffff]">${subTotal}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-[#171717]">
                      <span className="text-[#EDEDED]/70 font-medium">Shipping:</span>
                      <span className="text-[#EDEDED]/60 italic">Calculated at checkout</span>
                    </div>
                    
                    <div className="pt-6">
                      {isLoggedIn &&<button 
                        onClick={() => navigate('/checkout')}
                        className="w-full bg-[#DA0037] text-[#EDEDED] font-bold py-4 rounded-xl hover:bg-[#444444] transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#DA0037] focus:ring-offset-2 focus:ring-offset-[#444444] shadow-xl text-lg"
                      >
                        Proceed to Checkout
                      </button>}
                      {!isLoggedIn && <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-[#DA0037] text-[#EDEDED] font-bold py-4 rounded-xl hover:bg-[#444444] transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#DA0037] focus:ring-offset-2 focus:ring-offset-[#444444] shadow-xl text-lg"
                      >
                        Login to Checkout
                      </button>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Empty Cart State - Tendora Themed */
          <div className="text-center py-16">
            <div className="bg-[#444444] rounded-2xl shadow-2xl border border-[#444444] p-12 max-w-lg mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-[#DA0037]/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-[#DA0037]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-[#EDEDED] mb-4">Your cart is empty</h2>
              <p className="text-[#EDEDED]/70 mb-8 text-lg">Discover premium fashion and exclusive collections at <span className="text-[#DA0037] text-2xl">Ten</span>dora.</p>
              <button 
                onClick={() => navigate('/')}
                className="bg-[#DA0037] text-[#EDEDED] font-bold px-8 py-4 rounded-xl hover:bg-[#444444] transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#DA0037] focus:ring-offset-2 focus:ring-offset-[#444444] shadow-xl text-lg"
              >
                Start Shopping
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Delete Confirmation Modal - Tendora Style */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={onCloseModal}
          style={customModalStyles}
          contentLabel="Delete Confirmation"
          ariaHideApp={false}
        >
          <div className="p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#DA0037]/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#DA0037]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[#EDEDED]">Confirm Removal</h2>
              </div>
              <button 
                onClick={onCloseModal}
                className="w-8 h-8 rounded-full bg-[#444444] flex items-center justify-center hover:bg-[#DA0037] hover:text-[#EDEDED] text-[#EDEDED]/70 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Content */}
            <p className="text-[#EDEDED]/70 mb-8 leading-relaxed text-lg">
              Are you sure you want to remove this item from your cart? This action cannot be undone.
            </p>
            
            {/* Modal Actions */}
            <div className="flex justify-end space-x-4">
              <button 
                onClick={onCloseModal}
                className="px-6 py-3 border-2 border-[#444444] text-[#EDEDED] font-semibold rounded-lg hover:border-[#DA0037] hover:bg-[#444444] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#DA0037] focus:ring-offset-2 focus:ring-offset-[#171717]"
              >
                Cancel
              </button>
              <button 
                onClick={onDeleteItem}
                className="px-6 py-3 bg-[#DA0037] text-[#EDEDED] font-semibold rounded-lg hover:bg-[#444444] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#DA0037] focus:ring-offset-2 focus:ring-offset-[#171717] transform hover:scale-[1.02]"
              >
                Remove Item
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Cartitem