import React from 'react'
import { logOut } from '../../utils/Jwt_helper';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const Settings = () => {
    
    const navigate = useNavigate();
    const onLogOut = useCallback(() => {
        logOut();
        navigate("/");
      }, [navigate]);
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#444444] pb-6">
        <h1 className="text-3xl font-bold text-[#EDEDED]">Account Settings</h1>
        <p className="text-[#EDEDED]/70 mt-2">Manage your account preferences and security</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Security Settings */}
        <div className="bg-[#181818] border border-[#444444] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-6 h-6 text-[#DA0037]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 className="text-xl font-semibold text-[#EDEDED]">Security & Privacy</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 bg-[#171717] rounded-lg border border-[#444444]">
              <div>
                <h3 className="text-[#EDEDED] font-medium">Change Password</h3>
                <p className="text-[#EDEDED]/70 text-sm mt-1">Update your account password</p>
              </div>
              <button className="bg-[#DA0037] hover:bg-[#b8002c] text-[#EDEDED] px-4 py-2 rounded-lg transition font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3.586l6.257-6.257A6 6 0 0121 9z" />
                </svg>
                Change Password
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 bg-[#171717] rounded-lg border border-[#444444]">
              <div>
                <h3 className="text-[#EDEDED] font-medium">Two-Factor Authentication</h3>
                <p className="text-[#EDEDED]/70 text-sm mt-1">Add an extra layer of security to your account</p>
              </div>
              <button className="border border-[#444444] hover:border-[#DA0037] text-[#EDEDED] hover:text-[#DA0037] px-4 py-2 rounded-lg transition font-medium">
                Enable 2FA
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-[#181818] border border-[#444444] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-6 h-6 text-[#DA0037]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM11 17H6l5 5v-5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 7l-1 1m-6-6h2l1 1H9l1-1z" />
            </svg>
            <h2 className="text-xl font-semibold text-[#EDEDED]">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-[#171717] rounded-lg border border-[#444444]">
              <div>
                <h3 className="text-[#EDEDED] font-medium">Email Notifications</h3>
                <p className="text-[#EDEDED]/70 text-sm mt-1">Receive order updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-[#444444] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#DA0037]"></div>
              </label>
            </div>

            <div className="flex justify-between items-center p-4 bg-[#171717] rounded-lg border border-[#444444]">
              <div>
                <h3 className="text-[#EDEDED] font-medium">SMS Notifications</h3>
                <p className="text-[#EDEDED]/70 text-sm mt-1">Receive order updates via SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-[#444444] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#DA0037]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-[#181818] border border-[#444444] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-6 h-6 text-[#DA0037]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-[#EDEDED]">Account Actions</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 bg-[#171717] rounded-lg border border-[#444444]">
              <div>
                <h3 className="text-[#EDEDED] font-medium">Download Data</h3>
                <p className="text-[#EDEDED]/70 text-sm mt-1">Download a copy of your account data</p>
              </div>
              <button className="border border-[#444444] hover:border-[#DA0037] text-[#EDEDED] hover:text-[#DA0037] px-4 py-2 rounded-lg transition font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 bg-red-500/10 rounded-lg border border-red-500/30">
              <div>
                <h3 className="text-[#EDEDED] font-medium">Sign Out</h3>
                <p className="text-[#EDEDED]/70 text-sm mt-1">Sign out from your account</p>
              </div>
              <button 
                onClick={onLogOut} 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings