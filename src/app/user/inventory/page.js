'use client';

import React, { useEffect, useState } from 'react';
import InventoryCard from '@/components/InventoryCard';
import { fetchUserResources, returnResource, fetchResourceById } from '@/components/api';

export default function InventoryPage() {
    const [inventory, setInventory] = useState([]);
    const [error, setError] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchInventory() {
            try {
                const userResources = await fetchUserResources();
                const inventoryWithResources = await Promise.all(userResources.map(async (item) => {
                    const resource = await fetchResourceById(item.resourceId);
                    const timeRemaining = calculateTimeRemaining(item.rentalEndTime);
                    return { ...item, resource, timeRemaining };
                }));
                setInventory(inventoryWithResources);
            } catch (error) {
                console.error('Error fetching inventory:', error);
                setError('An error occurred while fetching inventory');
            } finally {
                setLoading(false);
            }
        }

        fetchInventory().catch(error => {
            console.error('Unhandled error:', error);
            setLoading(false);
        });
    }, []);

    const calculateTimeRemaining = (rentalEndTime) => {
        const endTime = new Date(rentalEndTime);
        const currentTime = new Date();
        const timeDiff = endTime - currentTime;

        if (timeDiff <= 0) {
            return "Overdue";
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (days > 0) {
            return `${days}d ${hours}h`;
        } else {
            return `${hours}h`;
        }
    };

    const handleReturn = async (userResourceId) => {
        try {
            await returnResource(String(userResourceId));
            setInventory(prevInventory =>
                prevInventory.filter(item => item.userResourceId !== userResourceId)
            );
        } catch (error) {
            console.error("Failed to return resource:", error);
        }
    };

    const handleItemClick = (userResourceId) => {
        setSelectedItemId(String(userResourceId));
    };

    const handleCloseDetail = () => {
        setSelectedItemId(null);
    };

    const selectedItem = selectedItemId ?
        inventory.find(item => String(item.userResourceId) === selectedItemId) : null;

    return (
        <div className="min-h-screen flex flex-col items-center p-4" style={{ backgroundColor: '#8D6E63' }}>
            <h1 className="text-3xl font-bold w-full text-center py-6">Inventory</h1>
            <div className="w-full max-w-6xl mt-4">
                {error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : inventory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 bg-amber-50 rounded-xl shadow-md" style={{ backgroundColor: '#D7CCC8' }}>
                        <div className="text-amber-700 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m-8-4l8 4m8 4l-8 4m8-4l-8-4m-8 4l8-4" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your inventory is empty</h2>
                        <p className="text-gray-600 text-center mb-6 max-w-md">
                            You haven't borrowed any resources yet. Browse available resources to add items to your inventory.
                        </p>
                        <a href="/resources" className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition duration-300 shadow-md">
                            Browse Resources
                        </a>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {inventory.map((item) => (
                                <InventoryCard
                                    key={item.userResourceId}
                                    userResourceId={item.userResourceId}
                                    status={item.status}
                                    timeRemaining={item.timeRemaining}
                                    resource={item.resource}
                                    onReturn={handleReturn}
                                    onImageClick={handleItemClick}
                                />
                            ))}
                        </div>

                        {selectedItemId && selectedItem && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                                <div className="max-h-[90vh] overflow-y-auto w-full">
                                    <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto relative">
                                        <button onClick={handleCloseDetail} className="btn btn-sm btn-circle absolute right-4 top-4">
                                            ✕
                                        </button>
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="flex-1">
                                                <img
                                                    src={selectedItem.resource.image}
                                                    alt={selectedItem.resource.name}
                                                    className="w-full h-64 object-cover rounded-lg shadow-md"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h1 className="text-3xl font-bold text-gray-800">{selectedItem.resource.name}</h1>
                                                <p className="text-gray-600 mt-2">{selectedItem.resource.description}</p>
                                                <div className="mt-4 space-y-2">
                                                    <p className="text-gray-700">
                                                        <strong className="text-gray-900">Type:</strong> {selectedItem.resource.type}
                                                    </p>
                                                    <p className="text-gray-700">
                                                        <strong className="text-gray-900">Status:</strong> {selectedItem.status}
                                                    </p>
                                                    <p className="text-gray-700">
                                                        <strong className="text-gray-900">Time Remaining:</strong> {selectedItem.timeRemaining}
                                                    </p>
                                                    <div className="mt-4 flex gap-3">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleReturn(selectedItem.userResourceId);
                                                                handleCloseDetail();
                                                            }}
                                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                                        >
                                                            Return
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}