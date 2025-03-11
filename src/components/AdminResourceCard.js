import React, { useState } from 'react';

const AdminResourceCard = ({ resources, onCreate, onEdit, onDelete }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newResource, setNewResource] = useState({
        name: '',
        description: '',
        type: '',
        image: ''
    });
    const [editingResource, setEditingResource] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewResource(prevResource => ({ ...prevResource, [name]: value }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingResource(prevResource => ({ ...prevResource, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resourceData = {
            ...newResource,
            availability: true,
        };

        await onCreate(resourceData);
        setIsAddModalOpen(false);
        setNewResource({
            name: '',
            description: '',
            type: '',
            image: ''
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        await onEdit(editingResource.resourceId, editingResource);
        setIsEditModalOpen(false);
        setEditingResource(null);
    };

    const openEditModal = (resource) => {
        setEditingResource({...resource});
        setIsEditModalOpen(true);
    };

    return (
        <div>
            <div className="flex items-center p-4 mb-4 border rounded-lg shadow-md w-full min-h-[180px]" style={{ backgroundColor: '#BCAAA4' }}>
                <div className="flex-1 grid grid-cols-5 gap-4 items-center text-center">
                    <div className="p-4 rounded-lg col-span-5" style={{ backgroundColor: '#D7CCC8' }}>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 text-lg"
                        >
                            Add Resource
                        </button>
                    </div>
                </div>
            </div>
            {resources.map(resource => (
                <div key={resource.resourceId} className="flex items-center p-4 mb-4 border rounded-lg shadow-md w-full min-h-[180px]" style={{ backgroundColor: '#BCAAA4' }}>
                    <div className="w-48 flex justify-center">
                        <img
                            src={resource.image}
                            alt={resource.name}
                            className="w-40 h-40 object-cover rounded-lg"
                        />
                    </div>
                    <div className="flex-1 grid grid-cols-5 gap-4 items-center text-center">
                        <div className="p-4 rounded-lg" style={{ backgroundColor: '#D7CCC8' }}>
                            <p className="text-sm text-gray-600">Name</p>
                            <p className="font-semibold text-black">{resource.name}</p>
                        </div>
                        <div className="p-4 rounded-lg col-span-2" style={{ backgroundColor: '#D7CCC8' }}>
                            <p className="text-sm text-gray-600">Description</p>
                            <p className="font-semibold truncate text-black">{resource.description}</p>
                        </div>
                        <div className="p-4 rounded-lg" style={{ backgroundColor: '#D7CCC8' }}>
                            <p className="text-sm text-gray-600">Type</p>
                            <p className="font-semibold text-black">{resource.type}</p>
                        </div>
                        <div className="p-4 rounded-lg flex justify-center items-center" style={{ backgroundColor: '#D7CCC8' }}>
                            <p className="text-sm text-gray-600 mr-2">Available</p>
                            <span className={`w-5 h-5 rounded-full text-black ${resource.availability ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        </div>
                    </div>
                    <div className="flex space-x-4 ml-8">
                        <button
                            onClick={() => openEditModal(resource)}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 text-lg"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(resource.resourceId)}
                            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow hover:bg-red-600 text-lg"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {isAddModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all scale-105">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Resource</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newResource.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={newResource.description}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 resize-none shadow-sm"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={newResource.type}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={newResource.image}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                />
                            </div>
                            <div className="flex justify-end space-x-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-5 py-2 bg-gray-400 text-white rounded-xl shadow-md hover:bg-gray-500 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isEditModalOpen && editingResource && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all scale-105">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Resource</h2>
                        <form onSubmit={handleEditSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editingResource.name}
                                    onChange={handleEditInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={editingResource.description}
                                    onChange={handleEditInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 resize-none shadow-sm"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={editingResource.type}
                                    onChange={handleEditInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={editingResource.image}
                                    onChange={handleEditInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Availability</label>
                                <select
                                    name="availability"
                                    value={editingResource.availability}
                                    onChange={handleEditInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                >
                                    <option value={true}>Available</option>
                                    <option value={false}>Not Available</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-5 py-2 bg-gray-400 text-white rounded-xl shadow-md hover:bg-gray-500 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminResourceCard;