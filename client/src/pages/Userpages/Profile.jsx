import React, { useCallback, useState } from "react";
import { removeAddress, selectUserInfo } from "../../store/features/User";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/features/Common";
import { deleteAddressAPI } from "../../api/userInfo";
import AddaAddress from "./AddaAddress";

const Profile = () => {
    const userInfo = useSelector(selectUserInfo);
    const [addAddress, setAddAddress] = useState(false);
    const dispatch = useDispatch();

    const onDeleteAddress = useCallback(
        (id) => {
            dispatch(setLoading(true));
            deleteAddressAPI(id)
                .then((res) => {
                    dispatch(removeAddress(id));
                })
                .catch((err) => { })
                .finally(() => {
                    dispatch(setLoading(false));
                });
        },
        [dispatch]
    );
    return (
        <div className="space-y-8">
            <div className="border-b border-[#444444] pb-4">
                <h1 className="text-3xl font-bold text-[#EDEDED]">My Profile</h1>
                <p className="text-[#EDEDED]/70 mt-2">Manage your personal information and addresses</p>
            </div>
            {!addAddress && (
                <div className="space-y-8">
                    <div className="bg-[#171717] border border-[#444444] rounded-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-[#EDEDED]">Contact Details</h2>
                            <button className="text-[#DA0037] hover:text-[#b8002c] transition font-medium flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1">
                                <p className="text-[#EDEDED]/60 text-sm font-medium uppercase tracking-wide">Full Name</p>
                                <p className="text-[#EDEDED] text-lg">{userInfo?.firstName} {userInfo?.lastName}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[#EDEDED]/60 text-sm font-medium uppercase tracking-wide">Phone Number</p>
                                <p className="text-[#EDEDED] text-lg">{userInfo?.phoneNumber ?? "None"}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[#EDEDED]/60 text-sm font-medium uppercase tracking-wide">Email</p>
                                <p className="text-[#EDEDED] text-lg">{userInfo?.email}</p>
                            </div>
                        </div>
                    </div>
                    {/* Addresses */}
                    <div className="bg-[#171717] border border-[#444444] rounded-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-[#EDEDED]">Addresses</h3>
                            <button
                                className="bg-[#DA0037] hover:bg-[#b8002c] text-[#EDEDED] px-4 py-2 rounded-lg transition font-medium flex items-center gap-2"
                                onClick={() => setAddAddress(true)}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add New
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userInfo?.addressList?.map((address, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="bg-[#181818] border border-[#444444] rounded-xl p-6 hover:border-[#DA0037]/50 transition group"
                                    >
                                        <div className="mb-4">
                                            <h4 className="text-[#EDEDED] font-semibold text-lg mb-2">{address?.name}</h4>
                                            <p className="text-[#EDEDED]/70 mb-1">{address?.phoneNumber}</p>
                                            <p className="text-[#EDEDED]/70 mb-1">
                                                {address?.street}, {address?.city}, {address?.state}
                                            </p>
                                            <p className="text-[#EDEDED]/70">{address?.zipCode}</p>
                                        </div>
                                        <div className="flex gap-3 pt-4 border-t border-[#444444]">
                                            <button className="text-[#DA0037] hover:text-[#b8002c] transition font-medium flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onDeleteAddress(address?.id)}
                                                className="text-red-400 hover:text-red-300 transition font-medium flex items-center gap-1"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
            {addAddress && <AddaAddress onCancel={() => setAddAddress(false)} />}
        </div>
    );
};

export default Profile;
