'use client';

import React, { useEffect, useState } from 'react';
import { getUserHistory } from '@/components/api';
import HistoryResourceCard from '@/components/HistoryResourceCard';

export default function UserHistoryPage() {
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('date-desc');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getUserHistory();
                setHistory(data);
            } catch (err) {
                setError('Failed to fetch history.');
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    useEffect(() => {
        let result = [...history];
        if (searchTerm) {
            result = result.filter(item =>
                (item.resourceName || '').toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (sortOption === 'date-desc') {
            result.sort((a, b) => new Date(b.rentalStartTime) - new Date(a.rentalStartTime));
        } else if (sortOption === 'date-asc') {
            result.sort((a, b) => new Date(a.rentalStartTime) - new Date(b.rentalStartTime));
        } else if (sortOption === 'type-az') {
            result.sort((a, b) => (a.resourceType || '').localeCompare(b.resourceType || ''));
        }
        setFilteredHistory(result);
    }, [history, searchTerm, sortOption]);

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex justify-center items-center text-red-600">{error}</div>;
    }

    return (
        <div className="min-h-screen p-8" style={{ backgroundColor: '#8D6E63' }}>
            <h1 className="text-3xl font-bold mb-8 text-white text-center">My Rental History</h1>
            <div className="max-w-3xl mx-auto mb-6 flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search by resource name..."
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <select
                    className="p-2 border border-gray-300 rounded-md"
                    value={sortOption}
                    onChange={e => setSortOption(e.target.value)}
                >
                    <option value="date-desc">Rental date (newest)</option>
                    <option value="date-asc">Rental date (oldest)</option>
                    <option value="type-az">Type (A-Z)</option>
                </select>
            </div>
            {filteredHistory.length === 0 ? (
                <p className="text-center text-white">No history found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {filteredHistory.map((item) => (
                        <HistoryResourceCard
                            key={item.userHistoryId}
                            name={item.resourceName}
                            description={item.resourceDescription}
                            type={item.resourceType}
                            image={item.resourceImage}
                            rentalStartTime={item.rentalStartTime}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}