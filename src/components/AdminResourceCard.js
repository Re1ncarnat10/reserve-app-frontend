import React from 'react';

const AdminResourceCard = ({ resource, onEdit, onDelete }) => {
    return (
        <div className="flex items-center justify-between p-4 mb-2 border rounded shadow-sm bg-white">
            <div>
                <p><strong>Name:</strong> {resource.name}</p>
                <p><strong>Description:</strong> {resource.description}</p>
                <p><strong>Type:</strong> {resource.type}</p>
                <p><strong>Availability:</strong> {resource.availability}</p>
            </div>
            <div>
                <img src={resource.image} alt={resource.name} className="w-16 h-16 object-cover rounded mr-4" />
                <button
                    onClick={() => onEdit(resource.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(resource.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default AdminResourceCard;