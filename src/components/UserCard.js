import React from 'react';

const UserCard = ({ user, onEdit, onDelete }) => {
    return (
        <div className="flex items-center justify-between p-4 mb-2 border rounded shadow-sm bg-white">
            <div>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Surname:</strong> {user.surname}</p>
                <p><strong>Department:</strong> {user.department}</p>
            </div>
            <div>
                <button
                    onClick={() => onEdit(user.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default UserCard;