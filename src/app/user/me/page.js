'use client';

import React, { useEffect, useState } from 'react';
import { getCurrentUserInfo, updateUserInfo } from '@/components/api';
import { useRouter } from 'next/navigation';

export default function UserProfilePage() {
    const [userInfo, setUserInfo] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        department: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
            return;
        }

        const fetchUserInfo = async () => {
            try {
                const data = await getCurrentUserInfo();
                setUserInfo(data);
                setFormData(data);
                setError(null);
            } catch (error) {
                console.error('Error fetching user info:', error);
                setError('Failed to fetch user information. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [router]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        try {
            await updateUserInfo(userInfo.id, formData);
            setUserInfo(formData);
            setSuccessMessage('Profile updated successfully');
            setIsEditMode(false);
        } catch (error) {
            console.error('Error updating user info:', error);
            setError('Failed to update profile. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center" style={{ backgroundColor: '#8D6E63' }}>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-4" style={{ backgroundColor: '#8D6E63' }}>
            <h1 className="text-3xl font-bold my-8 text-white">My Profile</h1>

            <div className="w-full max-w-lg p-8 rounded-lg shadow-xl" style={{ backgroundColor: '#D7CCC8' }}>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                        {successMessage}
                    </div>
                )}

                {userInfo && !isEditMode && (
                    <div className="space-y-6">
                        <div className="border-b pb-3">
                            <h3 className="text-gray-700 font-medium mb-1">Name</h3>
                            <p className="text-gray-900 font-semibold text-lg">{userInfo.name || 'Not provided'}</p>
                        </div>

                        <div className="border-b pb-3">
                            <h3 className="text-gray-700 font-medium mb-1">Surname</h3>
                            <p className="text-gray-900 font-semibold text-lg">{userInfo.surname || 'Not provided'}</p>
                        </div>

                        <div className="border-b pb-3">
                            <h3 className="text-gray-700 font-medium mb-1">Email</h3>
                            <p className="text-gray-900 font-semibold text-lg">{userInfo.email || 'Not provided'}</p>
                        </div>

                        <div className="border-b pb-3">
                            <h3 className="text-gray-700 font-medium mb-1">Department</h3>
                            <p className="text-gray-900 font-semibold text-lg">{userInfo.department || 'Not provided'}</p>
                        </div>

                        <button
                            onClick={() => setIsEditMode(true)}
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg shadow transition duration-200"
                        >
                            Edit My Profile
                        </button>

                        <button
                            onClick={() => router.push('/user/me/history')}
                            className="w-full bg-amber-400 hover:bg-amber-500 text-white font-medium py-3 px-6 rounded-lg shadow transition duration-200 mt-2"
                        >
                            View My Rental History
                        </button>
                    </div>
                )}

                {userInfo && isEditMode && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="surname" className="block text-gray-700 font-medium mb-2">Surname</label>
                            <input
                                type="text"
                                id="surname"
                                value={formData.surname || ''}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="department" className="block text-gray-700 font-medium mb-2">Department</label>
                            <input
                                type="text"
                                id="department"
                                value={formData.department || ''}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            />
                        </div>

                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg shadow transition duration-200"
                            >
                                Save Changes
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditMode(false);
                                    setFormData(userInfo);
                                }}
                                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg shadow transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}