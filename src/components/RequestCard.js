import React from 'react';

const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
};

const RequestCard = ({ request, onApprove, onDelete }) => {
    return (
        <div className="flex items-center p-4 mb-4 border rounded-lg shadow-md w-full min-h-[180px]" style={{ backgroundColor: '#BCAAA4' }}>
            <div className="w-48 flex justify-center">
                <img
                    src={request.resourceImage}
                    alt={request.userName}
                    className="w-40 h-40 object-cover rounded-lg"
                />
            </div>
            <div className="flex-1 grid grid-cols-7 gap-4 items-center text-center">
                <div className="p-4 rounded-lg" style={{ backgroundColor:  '#D7CCC8' }}>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold text-black">{request.userName}</p>
                </div>
                <div className="p-4 rounded-lg col-span-2" style={{ backgroundColor:  '#D7CCC8' }}>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold truncate text-black">{request.status}</p>
                </div>
                <div className="p-4 rounded-lg col-span-2" style={{ backgroundColor:  '#D7CCC8' }}>
                    <p className="text-sm text-gray-600">Rental Start Time</p>
                    <p className="font-semibold break-all text-black">{formatDate(request.rentalStartTime)}</p>
                </div>
                <div className="p-4 rounded-lg col-span-2" style={{ backgroundColor:  '#D7CCC8' }}>
                    <p className="text-sm text-gray-600">Rental End Time</p>
                    <p className="font-semibold break-all text-black">{formatDate(request.rentalEndTime)}</p>
                </div>
            </div>
            <div className="flex space-x-4 ml-8">
                <button
                    onClick={() => onApprove(request.userResourceId, request)}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 text-lg"
                >
                    Approve
                </button>
                <button
                    onClick={() => onDelete(request.userResourceId, request)}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg shadow hover:bg-red-600 text-lg"
                >
                    Don't Approve
                </button>
            </div>
        </div>
    );
};

export default RequestCard;