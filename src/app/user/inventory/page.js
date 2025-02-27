'use client';

import React, { useEffect, useState } from 'react';
import InventoryCard from '@/components/InventoryCard';

export default function InventoryPage({ userId }) {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/inventory/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch inventory');
                }
                const data = await response.json();
                setInventory(data);
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };

        fetchInventory();
    }, [userId]);

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-5xl font-bold text-blue-600 mb-8">Inventory</h1>
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
                    />
                ))}
            </div>
        </div>
    );
}