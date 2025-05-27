'use client';

import React, { useState, useEffect } from 'react';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import { useRouter } from 'next/navigation';
import { fetchUserResources } from '@/components/api';


function useApprovedNotification() {
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const checkApproved = async () => {
            try {
                const data = await fetchUserResources();
                const approved = data.filter(r => r.status === "approved");
                const prevApprovedIds = JSON.parse(localStorage.getItem("approvedResourceIds") || "[]");
                const newApproved = approved.filter(r => !prevApprovedIds.includes(r.resourceId));
                if (newApproved.length > 0) {
                    setNotification(`${newApproved.length} zasobów zostało zaakceptowanych, sprawdź inwentarz.`);
                    localStorage.setItem("approvedResourceIds", JSON.stringify(approved.map(r => r.resourceId)));
                }
            } catch {}
        };
        const token = localStorage.getItem("token");
        if (token) checkApproved();
    }, []);

    return [notification, setNotification];
}

export default function HomePage() {
    const [activeForm, setActiveForm] = useState('login');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notification, setNotification] = useApprovedNotification();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const navigateTo = (path) => {
        router.push(path);
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-4" style={{ backgroundColor: '#8D6E63' }}>
            <h1 className="text-5xl font-bold my-8 text-white">Reserve</h1>

            {notification && (
                <div className="fixed top-6 right-6 bg-green-600 text-white p-4 rounded shadow-lg z-50 animate-bounce flex items-center">
                    {notification}
                    <button className="ml-4 text-white font-bold text-xl" onClick={() => setNotification(null)}>×</button>
                </div>
            )}

            {!isLoggedIn ? (
                <div className="p-8 rounded-lg w-full max-w-md h-[750px] flex flex-col shadow-xl"
                     style={{ backgroundColor: '#D7CCC8' }}>
                    <div className="mb-6 flex justify-center gap-4">
                        <button
                            onClick={() => setActiveForm('login')}
                            className={`px-4 py-2 rounded-lg transition font-medium ${
                                activeForm === 'login'
                                    ? 'bg-[#6D4C41] text-white shadow-md'
                                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setActiveForm('register')}
                            className={`px-4 py-2 rounded-lg transition font-medium ${
                                activeForm === 'register'
                                    ? 'bg-[#6D4C41] text-white shadow-md'
                                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                        >
                            Register
                        </button>
                    </div>
                    <div className="flex-grow">
                        {activeForm === 'login' ? (
                            <LoginForm />
                        ) : (
                            <RegisterForm onToggleToLoginAction={() => setActiveForm('login')} />
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-6xl">
                    <div className="bg-amber-50 rounded-xl p-8 mb-8 shadow-lg" style={{ backgroundColor: '#D7CCC8' }}>
                        <div className="flex items-center mb-6">
                            <div className="bg-amber-600 rounded-full p-3 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800">Welcome back!</h2>
                                <p className="text-gray-600">What would you like to do today?</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div onClick={() => navigateTo('/user/inventory')}
                             className="bg-amber-50 rounded-xl p-6 shadow-md cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1"
                             style={{ backgroundColor: '#D7CCC8' }}>
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-500 rounded-full p-3 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">My Inventory</h3>
                            </div>
                            <p className="text-gray-600">View and manage your borrowed resources</p>
                        </div>

                        <div onClick={() => navigateTo('/resources')}
                             className="bg-amber-50 rounded-xl p-6 shadow-md cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1"
                             style={{ backgroundColor: '#D7CCC8' }}>
                            <div className="flex items-center mb-4">
                                <div className="bg-green-500 rounded-full p-3 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Browse Resources</h3>
                            </div>
                            <p className="text-gray-600">Discover and borrow available resources</p>
                        </div>

                        <div onClick={() => navigateTo('/user/me')}
                             className="bg-amber-50 rounded-xl p-6 shadow-md cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1"
                             style={{ backgroundColor: '#D7CCC8' }}>
                            <div className="flex items-center mb-4">
                                <div className="bg-purple-500 rounded-full p-3 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">My Profile</h3>
                            </div>
                            <p className="text-gray-600">View and edit your account information</p>
                        </div>

                        <div onClick={() => navigateTo('/user/me/history')}
                             className="bg-amber-50 rounded-xl p-6 shadow-md cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1"
                             style={{ backgroundColor: '#D7CCC8' }}>
                            <div className="flex items-center mb-4">
                                <div className="bg-amber-600 rounded-full p-3 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Rental History</h3>
                            </div>
                            <p className="text-gray-600">View your past and current rentals</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}