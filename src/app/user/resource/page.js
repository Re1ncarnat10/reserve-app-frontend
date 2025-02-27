'use client';

import React, { useEffect, useState } from 'react';
import ResourceCard from '@/components/ResourceCard';

export default function ResourcesPage() {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/resources');
                if (!response.ok) {
                    throw new Error('Failed to fetch resources');
                }
                const data = await response.json();
                setResources(data);
            } catch (error) {
                console.error('Error fetching resources:', error);
            }
        };

        fetchResources();
    }, []);

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-5xl font-bold text-blue-600 mb-8">Resources</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {resources.map((resource) => (
                    <ResourceCard
                        key={resource.resourceId}
                        resourceId={resource.resourceId}
                        name={resource.name}
                        description={resource.description}
                        type={resource.type}
                        image={resource.image}
                        availability={resource.availability}
                    />
                ))}
            </div>
        </div>
    );
}