import React, { useState } from 'react';
import { loginUser } from '@/components/api';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);

        try {
            await loginUser(formData);
            window.location.reload();
        } catch (error) {
            setErrorMessage(error.message || 'An unexpected error occurred');
        }
    };

    return (
        <>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="p-4 mb-4 border rounded-lg shadow-md w-full min-h-[180px]" style={{ backgroundColor: '#BCAAA4' }}>
                <h2 className="text-2xl font-bold mb-4">Login</h2>
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
                <button
                    type="submit"
                    className="w-full  text-white p-2 rounded mb-4 "
                    style={{ backgroundColor: '#6D4C41' }}
                >
                    Login
                </button>
            </form>
        </>
    );
};

export default LoginForm;