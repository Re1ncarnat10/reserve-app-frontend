import React from 'react';

const UserCard = ({ user, onEdit, onDelete }) => {
    return (
        <div className="flex items-center p-4 mb-4 border rounded-lg shadow-md bg-white w-full min-h-[180px]">
            <div className="flex-1 grid grid-cols-5 gap-4 items-center text-center">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold">{user.name} {user.surname}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg col-span-2">
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold truncate">{user.email}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg col-span-2">
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-semibold truncate">{user.department}</p>
                </div>
            </div>

            <div className="flex space-x-4 ml-8">
                <button
                    onClick={() => onEdit(user.id)}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 text-lg"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(user.id)}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg shadow hover:bg-red-600 text-lg"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default UserCard;