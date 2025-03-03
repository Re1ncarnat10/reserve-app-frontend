'use client';

import React, { useState } from 'react';
import { registerUser } from '@/components/api';

const RegisterForm = ({ onToggleToLoginAction }) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        department: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            await registerUser(formData);
            setSuccessMessage('Registration successful!');

            setTimeout(() => {
                onToggleToLoginAction();
            }, 500);
        } catch (error) {
            setErrorMessage(error.message || 'An unexpected error occurred');
        }
    };

    return (
        <>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            {successMessage && <div className="text-green-500">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-500 bg-white"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="surname" className="block text-gray-700">Surname:</label>
                    <input
                        type="text"
                        id="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-500 bg-white"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-500 bg-white"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="department" className="block text-gray-700">Department:</label>
                    <input
                        type="text"
                        id="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-500 bg-white"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-500 bg-white"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-500 bg-white"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded mb-4"
                >
                    Register
                </button>
            </form>
        </>
    );
};

export default RegisterForm;