import React, { useEffect, useState } from "react";
import { fetchResourceById } from "@/components/api";

const ResourceDetail = ({ resourceId, onClose }) => {
    const [resource, setResource] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getResource = async () => {
            try {
                const data = await fetchResourceById(resourceId);
                setResource(data);
            } catch (error) {
                console.error("Error fetching resource:", error);
                setError("Failed to fetch resource details");
            }
        };
        getResource().catch(err => {
            console.error("Unhandled promise rejection:", err);
            setError("An unexpected error occurred");
        });

        return () => {
        };
    }, [resourceId]);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!resource) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }


    return (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto relative">
            {onClose && (
                <button onClick={onClose} className="btn btn-sm btn-circle absolute right-4 top-4">
                    ✕
                </button>
            )}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <img
                        src={resource.image}
                        alt={resource.name}
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800">{resource.name}</h1>
                    <p className="text-gray-600 mt-2">{resource.description}</p>
                    <div className="mt-4 space-y-2">
                        <p className="text-gray-700">
                            <strong className="text-gray-900">Type:</strong> {resource.type}
                        </p>
                        <p className={`font-semibold ${resource.availability ? "text-green-600" : "text-red-500"}`}>
                            <strong>Availability:</strong> {resource.availability ? "✅ Available" : "❌ Unavailable"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceDetail;