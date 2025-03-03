import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RequestForm from '@/components/RequestForm';

const ResourceCard = ({ resourceId, name, description, type, image, availability, onClick, userId }) => {
    const [showRequestForm, setShowRequestForm] = useState(false);

    const handleRequestClick = () => {
        setShowRequestForm(true);
    };

    return (
        <div className="resource-card border rounded shadow-md p-4">
            <img
                src={image}
                alt={name}
                className="resource-image w-full h-48 object-cover rounded mb-4"
                onClick={onClick}
            />
            <h2 className="resource-name text-xl font-bold mb-2">{name}</h2>
            <p className="resource-description text-gray-700 mb-2">{description}</p>
            <p className="resource-type text-gray-500 mb-2">Type: {type}</p>
            <p className="resource-availability text-gray-500">Availability: {availability}</p>
            <button
                onClick={handleRequestClick}
                className="bg-blue-500 text-white px-2 py-1 rounded mt-4"
            >
                Request
            </button>
            {showRequestForm && (
                <RequestForm resourceId={resourceId} userId={userId} />
            )}
        </div>
    );
};

ResourceCard.propTypes = {
    resourceId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    availability: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
};

export default ResourceCard;