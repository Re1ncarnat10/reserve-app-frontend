import React, { useState } from "react";
import PropTypes from "prop-types";
import RequestForm from "@/components/RequestForm";

const ResourceCard = ({ resourceId, name, description, type, image, availability, onClick, userId }) => {
    const [showRequestForm, setShowRequestForm] = useState(false);

    const handleRequestClick = () => {
        setShowRequestForm((prevState) => !prevState);
    };

    const defaultImage = "https://e7.pngegg.com/pngimages/128/129/png-clipart-animated-film-question-mark-others-3d-computer-graphics-question-thumbnail.png";

    return (
        <div className="border-2 border-gray-300 shadow-md hover:shadow-xl rounded-xl p-6 transition-all duration-300 bg-white cursor-pointer">
            <img
                src={image || defaultImage}
                alt={name}
                className="w-full h-48 object-cover rounded-lg mb-6"
                onClick={onClick}
            />
            <h2 className="text-2xl font-bold text-center text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                {name}
            </h2>
            <p className="text-gray-700 text-center mb-4 leading-relaxed">
                {description}
            </p>
            <hr className="my-4 border-gray-300" />
            <p className="text-gray-600 text-center"><strong>Type:</strong> {type}</p>
            <p className="text-gray-600 text-center mb-6">
                <strong>Availability:</strong> {availability ? '✅' : '❌'}
            </p>
            <button
                onClick={handleRequestClick}
                className={`btn btn-primary w-full py-3 text-lg font-semibold tracking-wide ${!availability ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!availability}
            >
                Request
            </button>
            {showRequestForm && <RequestForm resourceId={resourceId} userId={userId} />}
        </div>
    );
};

ResourceCard.propTypes = {
    resourceId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string,
    availability: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
};

export default ResourceCard;