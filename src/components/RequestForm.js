import React, { useState } from 'react';
import { requestResource } from '@/components/api';

const RequestForm = ({ resourceId, userId }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [requestError, setRequestError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        setRequestError('');
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
        setRequestError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setRequestError('');

        // Validate dates
        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (start < today) {
            setRequestError("Start date cannot be in the past");
            setIsSubmitting(false);
            return;
        }

        if (end < start) {
            setRequestError("End date must be after start date");
            setIsSubmitting(false);
            return;
        }

        const requestDto = {
            userId: String(userId),
            resourceId: resourceId,
            status: "pending",
            rentalStartTime: new Date(startDate).toISOString(),
            rentalEndTime: new Date(endDate).toISOString(),
        };

        try {
            await requestResource(requestDto);
            setIsRequestModalOpen(true);
        } catch (error) {
            console.error('Failed to request resource:', error);
            setRequestError(error.message || 'Failed to request resource. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeRequestModal = () => {
        setIsRequestModalOpen(false);
        setStartDate('');
        setEndDate('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col p-6 mb-4 border rounded-lg shadow-md bg-amber-50">
                <h3 className="text-xl font-semibold mb-4 text-amber-800">Request Resource</h3>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Rental Start Date:</label>
                    <div className="relative">
                        <input
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-300"
                            required
                            min={new Date().toISOString().split('T')[0]}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 font-medium mb-2">Rental End Date:</label>
                    <div className="relative">
                        <input
                            type="date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-300"
                            required
                            min={startDate || new Date().toISOString().split('T')[0]}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className={`px-4 py-3 rounded-md text-white font-medium transition duration-300 ${
                        isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:ring-amber-300 focus:outline-none'
                    }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Request Resource'}
                </button>

                {requestError && (
                    <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                        <p className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                            {requestError}
                        </p>
                    </div>
                )}
            </form>

            {isRequestModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 scale-100">
                        <div className="text-center mb-4">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mt-3">Resource Requested Successfully!</h3>
                            <p className="text-gray-600 mt-2">
                                Your request has been submitted and is pending approval.
                                You will be notified once it's processed.
                            </p>
                        </div>
                        <div className="mt-5">
                            <button
                                onClick={closeRequestModal}
                                className="w-full inline-flex justify-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestForm;