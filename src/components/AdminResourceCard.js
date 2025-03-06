import React from 'react';

const AdminResourceCard = ({ resource, onEdit, onDelete }) => {
    return (
        <div className="flex items-center p-4 mb-4 border rounded-lg shadow-md bg-white w-full min-h-[180px]">
            <div className="w-48 flex justify-center">
                <img
                    src={resource.image}
                    alt={resource.name}
                    className="w-40 h-40 object-cover rounded-lg"
                />
            </div>
            <div className="flex-1 grid grid-cols-5 gap-4 items-center text-center">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold">{resource.name}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg col-span-2">
                    <p className="text-sm text-gray-600">Description</p>
                    <p className="font-semibold truncate">{resource.description}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-semibold">{resource.type}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex justify-center items-center">
                    <p className="text-sm text-gray-600 mr-2">Available</p>
                    <span className={`w-5 h-5 rounded-full ${resource.availability ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </div>
            </div>
            <div className="flex space-x-4 ml-8">
                <button
                    onClick={() => onEdit(resource.resourceId)}
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
    );
};

export default AdminResourceCard;
