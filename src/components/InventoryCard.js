import React from 'react';
import PropTypes from 'prop-types';

const InventoryCard = ({ userResourceId, name, description, type, image, status, timeRemaining }) => {
    return (
        <div className="inventory-card border rounded shadow-md p-4">
            <img src={image} alt={name} className="inventory-image w-full h-48 object-cover rounded mb-4" />
            <h2 className="inventory-name text-xl font-bold mb-2">{name}</h2>
            <p className="inventory-description text-gray-700 mb-2">{description}</p>
            <p className="inventory-type text-gray-500 mb-2">Type: {type}</p>
            <p className="inventory-status text-gray-500 mb-2">Status: {status}</p>
            <p className="inventory-time-remaining text-gray-500">Time Remaining: {timeRemaining}</p>
        </div>
    );
};

InventoryCard.propTypes = {
    userResourceId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    timeRemaining: PropTypes.string.isRequired,
};

export default InventoryCard;