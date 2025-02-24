'use client';

import React, { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

export default function HomePage() {
    const [activeForm, setActiveForm] = useState('login');

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-5xl font-bold text-blue-600 mb-8">Reserve</h1>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md h-[750px] flex flex-col">
                <div className="mb-6 flex justify-center gap-4">
                    <button
                        onClick={() => setActiveForm('login')}
                        className={`px-4 py-2 rounded transition ${
                            activeForm === 'login'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-500'
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setActiveForm('register')}
                        className={`px-4 py-2 rounded transition ${
                            activeForm === 'register'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-500'
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
        </div>
    );
}