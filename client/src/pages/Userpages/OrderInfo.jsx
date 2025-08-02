import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/features/Common';
import { cancelOrderAPI, fetchOrderAPI } from '../../api/userInfo';
import { cancelOrder, loadOrders, selectAllOrders } from '../../store/features/User';
import moment from 'moment';
import Timeline from '../../components/Timeline/Timeline';
import { getStepCount } from '../../utils/Order_utils';

const OrderInfo = () => {


  const dispatch = useDispatch();
  const allOrders = useSelector(selectAllOrders);
  const [selectedFilter, setSelectedFilter] = useState('ACTIVE');
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState('');


  useEffect(() => {
    dispatch(setLoading(true));
    fetchOrderAPI().then(res => {
      dispatch(loadOrders(res));
    }).catch(() => {
      // Handle error silently
    }).finally(() => {
      dispatch(setLoading(false));
    })
  }, [dispatch]);

  useEffect(() => {
    const displayOrders = [];
    allOrders?.map(order => {

      displayOrders.push({
        id: order?.id,
        orderDate: order?.orderDate,
        orderStatus: order?.orderStatus,
        status: (order?.orderStatus === 'PENDING' || order?.orderStatus === 'IN_PROGRESS' || order?.orderStatus === 'SHIPPED') ? 'ACTIVE' : order?.orderStatus === 'DELIVERED' ? 'COMPLETED' : order?.orderStatus,
        items: order?.orderItemList?.map(orderItem => {
          return {
            id: orderItem?.id,
            name: orderItem?.product?.name,
            price: orderItem?.product?.price,
            quantity: orderItem?.quantity,
            url: orderItem?.product?.resources?.[0]?.url,
            slug: orderItem?.product?.slug,
          }
        }),
        totalAmount: order?.totalAmount,
      })
    });
    setOrders(displayOrders);

  }, [allOrders]);

  const handleOnChange = useCallback((evt) => {
    const value = evt?.target?.value;
    setSelectedFilter(value);
  }, []);

  const onCancelOrder = useCallback((id) => {
    dispatch(setLoading(true));
    cancelOrderAPI(id).then(() => {
      dispatch(cancelOrder(id));
    }).catch(() => {
      // Handle error silently
    }).finally(() => {
      dispatch(setLoading(false));
    });
  }, [dispatch])


  return (
    <div className="space-y-6">
      {orders?.length > 0 && 
        <div className='w-full'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
            <div>
              <h1 className='text-3xl font-bold text-[#EDEDED]'>My Orders</h1>
              <p className="text-[#EDEDED]/70 mt-1">Track and manage your orders</p>
            </div>
            <select 
              className='bg-[#181818] border border-[#444444] text-[#EDEDED] rounded-lg px-4 py-3 focus:border-[#DA0037] focus:outline-none transition min-w-[140px]' 
              value={selectedFilter} 
              onChange={handleOnChange}
            >
              <option value={'ACTIVE'} className="bg-[#181818]">Active Orders</option>
              <option value={'CANCELLED'} className="bg-[#181818]">Cancelled</option>
              <option value={'COMPLETED'} className="bg-[#181818]">Completed</option>
            </select>
          </div>
          <div className="space-y-6">
            {
              orders?.map((order, index) => {
                return (
                  order?.status === selectedFilter && 
                  <div key={index} className="bg-[#181818] border border-[#444444] rounded-xl overflow-hidden hover:border-[#DA0037]/50 transition">
                    <div className='p-6'>
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                        <div className="space-y-3">
                          <h3 className='text-xl font-semibold text-[#EDEDED]'>Order #{order?.id}</h3>
                          <div className='space-y-1 text-[#EDEDED]/70'>
                            <p className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8v2m-6-4h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2z" />
                              </svg>
                              Order Date: {moment(order?.orderDate).format('MMMM DD, YYYY')}
                            </p>
                            <p className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                              Expected Delivery: {moment(order?.orderDate).add(3, 'days').format('MMMM DD, YYYY')}
                            </p>
                          </div>
                        </div>
                        <div className='flex flex-col items-start lg:items-end gap-3'>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order?.orderStatus === 'DELIVERED' ? 'bg-green-500/20 text-green-400' :
                            order?.orderStatus === 'CANCELLED' ? 'bg-red-500/20 text-red-400' :
                            order?.orderStatus === 'SHIPPED' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {order?.orderStatus}
                          </span>
                          <button 
                            onClick={() => setSelectedOrder(selectedOrder === order?.id ? '' : order?.id)} 
                            className='text-[#DA0037] hover:text-[#b8002c] transition font-medium flex items-center gap-1'
                          >
                            {selectedOrder === order?.id ? (
                              <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                                Hide Details
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                View Details
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {selectedOrder === order?.id && (
                      <div className="border-t border-[#444444] bg-[#171717] p-6">
                        <h4 className="text-lg font-semibold text-[#EDEDED] mb-4">Order Items</h4>
                        <div className="space-y-4 mb-6">
                          {order?.items?.map((orderItem, index) => {
                            return (
                              <div key={index} className='flex gap-4 p-4 bg-[#181818] rounded-lg border border-[#444444]'>
                                <img 
                                  src={orderItem?.url} 
                                  alt={orderItem?.name} 
                                  className='w-20 h-20 object-cover rounded-lg flex-shrink-0' 
                                />
                                <div className='flex flex-col justify-center space-y-1'>
                                  <h5 className="text-[#EDEDED] font-medium">{orderItem?.name || 'Product Name'}</h5>
                                  <p className="text-[#EDEDED]/70 text-sm">Quantity: {orderItem?.quantity}</p>
                                  <p className="text-[#DA0037] font-semibold">${orderItem?.price}</p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                        
                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-[#181818] rounded-lg border border-[#444444]'>
                          <div className="text-xl font-semibold text-[#EDEDED]">
                            Total: <span className="text-[#DA0037]">${order?.totalAmount}</span>
                          </div>
                        </div>

                        {order?.orderStatus !== 'CANCELLED' && (
                          <div className="mt-6 space-y-4">
                            <Timeline stepCount={getStepCount[order?.orderStatus]} />
                            {getStepCount[order?.orderStatus] <= 2 && (
                              <button 
                                onClick={() => onCancelOrder(order?.id)} 
                                className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition font-medium flex items-center gap-2'
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancel Order
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })
            }
          </div>
        </div>
      }
    </div>
  )
}

export default OrderInfo