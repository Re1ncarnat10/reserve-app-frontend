'use client'

import React, { useEffect, useState } from 'react';
import ResourceCard from '@/components/ResourceCard';
import { fetchResources } from '@/components/api';

const ResourcePage = () => {
    const [resources, setResources] = useState([]);
    const [error, setError] = useState(null);
    const [userId] = useState(null);

    useEffect(() => {
        async function fetchResourcesData() {
            try {
                const data = await fetchResources();
                setResources(data);
            } catch (error) {
                console.error('Error fetching resources:', error);
                setError('An error occurred while fetching resources');
            }
        }

        fetchResourcesData();
    }, []);

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-5xl font-bold text-blue-600 mb-8">Resources</h1>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {resources.map((resource) => (
                        <ResourceCard key={resource.resourceId} resourceId={resource.resourceId} {...resource} userId={userId} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResourcePage;