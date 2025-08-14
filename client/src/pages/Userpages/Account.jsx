import React, { useCallback } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logOut } from '../../utils/Jwt_helper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/features/Common';
import { loadUserInfo, selectIsUserAdmin, selectUserInfo } from '../../store/features/User';
import { fetchUserDetails } from '../../api/userInfo';

const Account = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const isUserAdmin = useSelector(selectIsUserAdmin);

  useEffect(() => {
    dispatch(setLoading(true));
    fetchUserDetails()
      .then((res) => {
        dispatch(loadUserInfo(res));
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);





  return (
    <div className="bg-[#171717] text-[#EDEDED] min-h-screen p-8">
        {isUserAdmin && (
          <div className="text-right mb-6">
            <Link
              to={"/admin"}
              className="inline-flex items-center px-6 py-2 rounded-xl border border-[#DA0037] bg-[#DA0037] text-[#EDEDED] hover:bg-[#b8002c] hover:border-[#b8002c] transition font-medium"
            >
              Manage Admin
            </Link>
          </div>
        )}
      {userInfo?.email && (
        <>
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Hello {userInfo?.firstName}</h1>
            <p className="text-lg text-[#EDEDED]/70">Welcome to your account dashboard</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            <div className="lg:w-80">
              <nav className="space-y-3">
                <NavLink
                  to={"/account/profile"}
                  className={({isActive})=> [
                    isActive? "bg-[#DA0037] hover:bg-[#b8002c] border-[#DA0037]":"bg-[#181818] hover:bg-[#444444] border-[#444444]",
                    "inline-flex items-center px-6 py-4 text-[#EDEDED] rounded-xl border transition-all duration-200 w-full font-medium group"
                  ].join(" ")}
                >
                  <svg
                    className="w-5 h-5 me-3 text-current"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                  Profile
                </NavLink>
                <NavLink
                  to={"/account/orderhistory"}
                  className={({isActive})=> [
                    isActive? "bg-[#DA0037] hover:bg-[#b8002c] border-[#DA0037]":"bg-[#181818] hover:bg-[#444444] border-[#444444]",
                    "inline-flex items-center px-6 py-4 text-[#EDEDED] rounded-xl border transition-all duration-200 w-full font-medium group"
                  ].join(" ")}
                >
                  <svg
                    className="w-5 h-5 me-3 text-current"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M13.5833 7.39473L13.5138 6.45768C13.4501 5.59928 12.7083 4.93421 11.8146 4.93421H9.99368M3.5 16.4167H2.45365C1.465 16.4167 0.683979 15.609 0.754417 14.6594L1.36283 6.45769C1.42651 5.59928 2.16831 4.93421 3.06207 4.93421H4.88298M4.88298 4.93421V3.29385C4.88298 1.93494 6.02705 0.833328 7.43833 0.833328C8.84961 0.833328 9.99368 1.93494 9.99368 3.29385V4.93421M4.88298 4.93421H9.99368M13.5833 12.75C13.5833 13.7625 12.7625 14.5833 11.75 14.5833C10.7375 14.5833 9.91667 13.7625 9.91667 12.75M8.08333 18.25H15.4167C16.4292 18.25 17.25 17.4292 17.25 16.4167V11.8333C17.25 10.8208 16.4292 9.99999 15.4167 9.99999H8.08333C7.07081 9.99999 6.25 10.8208 6.25 11.8333V16.4167C6.25 17.4292 7.07081 18.25 8.08333 18.25Z"
                    />
                  </svg>
                  Orders
                </NavLink>
                <NavLink
                  to={"/account/settings"}
                  className={({isActive})=> [
                    isActive? "bg-[#DA0037] hover:bg-[#b8002c] border-[#DA0037]":"bg-[#181818] hover:bg-[#444444] border-[#444444]",
                    "inline-flex items-center px-6 py-4 text-[#EDEDED] rounded-xl border transition-all duration-200 w-full font-medium group"
                  ].join(" ")}
                >
                  <svg
                    className="w-5 h-5 me-3 text-current"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                  </svg>
                  Settings
                </NavLink>
              </nav>
            </div>
            <div className="flex-1 bg-[#181818] rounded-xl border border-[#444444] p-6">
                <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Account