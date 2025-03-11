import React from "react";
import PropTypes from "prop-types";

const InventoryCard = ({ userResourceId, status, timeRemaining, resource, onReturn, onImageClick }) => {
    const statusColors = {
        pending: "bg-amber-100 text-amber-700 border-amber-300",
        approved: "bg-green-100 text-green-700 border-green-300",
        declined: "bg-red-100 text-red-700 border-red-300",
        cancelled: "bg-gray-100 text-gray-700 border-gray-300",
    };

    const statusIcons = {
        pending: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        approved: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        ),
        declined: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        ),
        cancelled: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    };

    return (
        <div className="border border-gray-200 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-amber-50">
            <div
                className="relative cursor-pointer"
                onClick={() => onImageClick && onImageClick(userResourceId)}
            >
                {resource && resource.image ? (
                    <div className="relative group">
                        <img src={resource.image} alt={resource.name} className="w-full h-48 object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                            <div className="bg-white bg-opacity-0 group-hover:bg-opacity-80 p-2 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-200 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                            <div className="bg-white bg-opacity-0 group-hover:bg-opacity-80 p-2 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
                <div className={`absolute top-3 right-3 ${statusColors[status] || "bg-gray-200 text-gray-700 border-gray-300"} border px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-sm`}>
                    {statusIcons[status] || null}
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
            </div>

            <div className="p-5">
                {resource && (
                    <>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">{resource.name}</h2>
                        <div className="flex items-center text-xs text-gray-500 mb-3">
                            <span className="bg-amber-200 text-amber-800 px-2 py-1 rounded-md">
                                {resource.type}
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.description}</p>
                    </>
                )}

                <div className={`mb-4 flex items-center ${timeRemaining === "Overdue" ? "text-red-600 font-semibold" : "text-gray-700"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${timeRemaining === "Overdue" ? "text-red-600" : "text-amber-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {timeRemaining === "Overdue" ? (
                        <span className="animate-pulse">{timeRemaining}</span>
                    ) : (
                        <>
                            <span className="font-medium mr-1">Time left:</span>
                            <span>{timeRemaining}</span>
                        </>
                    )}
                </div>

                <div className="flex space-x-3">
                    <button
                        onClick={() => onReturn(userResourceId)}
                        className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 font-medium flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                        Return
                    </button>
                </div>
            </div>
        </div>
    );
};

InventoryCard.propTypes = {
    userResourceId: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    timeRemaining: PropTypes.string.isRequired,
    resource: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        image: PropTypes.string,
    }),
    onReturn: PropTypes.func.isRequired,
    onImageClick: PropTypes.func
};

export default InventoryCard;