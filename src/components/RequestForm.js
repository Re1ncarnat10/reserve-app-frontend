import React, { useState } from 'react';
import { requestResource } from '@/components/api';

const RequestForm = ({ resourceId, userId }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [requestError, setRequestError] = useState('');

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            setRequestError(error.message);
        }
    };

    const closeRequestModal = () => {
        setIsRequestModalOpen(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col p-4 mb-2 border rounded shadow-sm bg-white">
                <div className="mb-4">
                    <label className="block text-gray-700">Rental Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Rental End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Submit Request
                </button>
            </form>
            {isRequestModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <p>Resource requested successfully!</p>
                        <button onClick={closeRequestModal} className="bg-blue-500 text-white px-4 py-2 rounded">
                            Close
                        </button>
                    </div>
                </div>
            )}
            {requestError && (
                <div className="text-red-500 mt-4">
                    <p>{requestError}</p>
                </div>
            )}
        </div>
    );
};

export default RequestForm;