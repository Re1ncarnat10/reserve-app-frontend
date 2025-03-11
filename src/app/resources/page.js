'use client';
import React, { useEffect, useState } from 'react';
import ResourceCard from '@/components/ResourceCard';
import ResourceDetail from '@/components/ResourceDetail';
import { fetchResources } from '@/components/api';

const ResourcePage = () => {
    const [resources, setResources] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [error, setError] = useState(null);
    const [userId] = useState(null);
    const [selectedResourceId, setSelectedResourceId] = useState(null);
    const [requestedResources, setRequestedResources] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    const [showAll, setShowAll] = useState(false);
    const [typeFilter, setTypeFilter] = useState('all');
    const [sortOption, setSortOption] = useState('none');

    const [resourceTypes, setResourceTypes] = useState([]);

    useEffect(() => {
        async function fetchResourcesData() {
            try {
                const data = await fetchResources();
                setResources(data);
                const availableResources = data.filter(resource =>
                    resource.availability === true || resource.isAvailable === true
                );
                setFilteredResources(availableResources);

                const types = [...new Set(data.map(resource => resource.type))].filter(Boolean);
                setResourceTypes(types);
            } catch (error) {
                console.error('Error fetching resources:', error);
                setError('An error occurred while fetching resources');
            }
        }

        fetchResourcesData();
    }, []);

    useEffect(() => {
        let result = [...resources];

        if (searchTerm) {
            result = result.filter(resource =>
                resource.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (!showAll) {
            result = result.filter(resource => {
                return (resource.availability === true || resource.isAvailable === true);
            });
        }
        if (typeFilter !== 'all') {
            result = result.filter(resource => resource.type === typeFilter);
        }

        if (sortOption === 'az') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === 'za') {
            result.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortOption === 'type-az') {
            result.sort((a, b) => (a.type || '').localeCompare(b.type || ''));
        } else if (sortOption === 'type-za') {
            result.sort((a, b) => (b.type || '').localeCompare(a.type || ''));
        }
        setFilteredResources(result);
    }, [resources, searchTerm, showAll, typeFilter, sortOption]);

    const handleImageClick = (resourceId) => {
        if (requestedResources.has(resourceId)) {
            setError('Resource already requested, check inventory');
        } else {
            setRequestedResources(new Set(requestedResources).add(resourceId));
            setSelectedResourceId(resourceId);
            setError(null);
        }
    };

    const handleCloseDetail = () => {
        setSelectedResourceId(null);
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-4" style={{ backgroundColor: '#8D6E63' }}>
            <h1 className="text-3xl font-bold w-full text-center py-6 text-white">Resources</h1>
            <div className="w-full max-w-6xl bg-amber-50 rounded-lg p-6 mb-6 shadow-lg" style={{ backgroundColor: '#D7CCC8' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="space-y-1">
                        <label htmlFor="search" className="block text-gray-700 font-medium">Search by name</label>
                        <div className="relative">
                            <input
                                id="search"
                                type="text"
                                placeholder="Search resources..."
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-300 ease-in-out"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a7 7 0 11-7 7 7 7 0 017-7z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 20l-4-4"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Availability Filter */}
                    <div className="space-y-1">
                        <label className="block text-gray-700 font-medium mb-2">Availability</label>
                        <div className="flex items-center h-10 transition duration-500 ease-in-out">
                            <input
                                id="availability"
                                type="checkbox"
                                className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                                checked={showAll}
                                onChange={(e) => setShowAll(e.target.checked)}
                            />
                            <label htmlFor="availability" className="ml-2 block text-gray-700">
                                Show All Resources
                            </label>
                        </div>
                    </div>

                    {/* Resource Type Filter */}
                    <div className="space-y-1">
                        <label htmlFor="type" className="block text-gray-700 font-medium">Type</label>
                        <select
                            id="type"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-300 ease-in-out"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <option value="all">All Types</option>
                            {resourceTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sort Filter */}
                    <div className="space-y-1">
                        <label htmlFor="sort" className="block text-gray-700 font-medium">Sort by</label>
                        <select
                            id="sort"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-300 ease-in-out"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="none">Default</option>
                            <option value="az">Name (A-Z)</option>
                            <option value="za">Name (Z-A)</option>
                            <option value="type-az">Type (A-Z)</option>
                            <option value="type-za">Type (Z-A)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-6xl mt-4">
                {error ? (
                    <p className="text-red-500 text-center bg-white p-3 rounded shadow">{error}</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {filteredResources.map((resource) => (
                                <ResourceCard
                                    key={resource.resourceId}
                                    resourceId={resource.resourceId}
                                    {...resource}
                                    userId={userId}
                                    onClick={() => handleImageClick(resource.resourceId)}
                                    className="transition-all transform hover:scale-105"
                                />
                            ))}
                        </div>

                        {filteredResources.length === 0 && (
                            <p className="text-white text-center mt-8 text-lg bg-amber-800 p-4 rounded-lg shadow">No resources found matching your criteria.</p>
                        )}

                        {selectedResourceId && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                                <div className="max-h-[90vh] overflow-y-auto w-full transition-all transform hover:scale-105">
                                    <ResourceDetail
                                        resourceId={selectedResourceId}
                                        onClose={handleCloseDetail}
                                    />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ResourcePage;
