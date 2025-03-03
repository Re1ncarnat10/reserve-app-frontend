'use client';

import React, { useEffect, useState } from 'react';
import { getUserInfo, updateUserInfo } from '@/components/api';

const UserProfilePage = ({ userId }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        department: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await getUserInfo(userId);
                setUserInfo(data);
                setFormData(data);
            } catch (error) {
                setError('Failed to fetch user info');
            }
        };

        fetchUserInfo().catch((error) => console.error('Unhandled error:', error));
    }, [userId]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserInfo(userId, formData);
            setError(null);
        } catch (error) {
            setError('Failed to update user info');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <h1 className="text-3xl font-bold mb-4">My Profile</h1>
            {error && <p className="text-red-500">{error}</p>}
            {userInfo && (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="surname" className="block text-gray-700">Surname:</label>
                        <input
                            type="text"
                            id="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="department" className="block text-gray-700">Department:</label>
                        <input
                            type="text"
                            id="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded"
                    >
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    );
};

export default UserProfilePage;