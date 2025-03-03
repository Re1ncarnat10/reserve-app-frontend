import React, { useEffect, useState } from 'react';
import { fetchResourceById } from '@/components/api';

const ResourceDetail = ({ resourceId }) => {
    const [resource, setResource] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getResource = async () => {
            try {
                const data = await fetchResourceById(resourceId);
                setResource(data);
            } catch (error) {
                console.error('Error fetching resource:', error);
                setError('Failed to fetch resource details');
            }
        };

        getResource();
    }, [resourceId]);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!resource) {
        return <p>Loading...</p>;
    }

    return (
        <div className="resource-detail p-4">
            <h1 className="text-3xl font-bold mb-4">{resource.name}</h1>
            <p><strong>Description:</strong> {resource.description}</p>
            <p><strong>Type:</strong> {resource.type}</p>
            <p><strong>Availability:</strong> {resource.availability}</p>
            <img src={resource.image} alt={resource.name} className="w-full h-64 object-cover rounded mt-4" />
        </div>
    );
};

export default ResourceDetail;