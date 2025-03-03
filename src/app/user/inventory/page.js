'use client';

import React, { useEffect, useState } from 'react';
import InventoryCard from '@/components/InventoryCard';
import { returnResource, deleteUserResource } from '@/components/api';

export default function InventoryPage({ userId }) {
    const [inventory, setInventory] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchInventory() {
            try {
                const response = await fetch(`http://localhost:8080/api/inventory/${userId}`);
                if (!response.ok) {
                    setError('Failed to fetch inventory');
                    return;
                }
                const data = await response.json();
                setInventory(data);
            } catch (error) {
                console.error('Error fetching inventory:', error);
                setError('An error occurred while fetching inventory');
            }
        }

        fetchInventory().catch((error) => console.error('Unhandled error:', error));
    }, [userId]);

    const handleReturn = async (userResourceId) => {
        try {
            await returnResource(userResourceId);
            setInventory((prevInventory) => prevInventory.filter(item => item.userResourceId !== userResourceId));
        } catch (error) {
            console.error("Failed to return resource:", error);
        }
    };

    const handleDelete = async (userResourceId) => {
        try {
            await deleteUserResource(userResourceId);
            setInventory((prevInventory) => prevInventory.filter(item => item.userResourceId !== userResourceId));
        } catch (error) {
            console.error("Failed to delete resource:", error);
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-5xl font-bold text-blue-600 mb-8">Inventory</h1>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {inventory.map((item) => (
                        <InventoryCard
                            key={item.userResourceId}
                            userResourceId={item.userResourceId}
                            name={item.name}
                            description={item.description}
                            type={item.type}
                            image={item.image}
                            status={item.status}
                            timeRemaining={item.timeRemaining}
                            onReturn={handleReturn}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}