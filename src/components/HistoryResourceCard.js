import React from "react";
import PropTypes from "prop-types";

const HistoryResourceCard = ({ name, description, type, image, rentalStartTime }) => {
    const defaultImage = "https://e7.pngegg.com/pngimages/128/129/png-clipart-animated-film-question-mark-others-3d-computer-graphics-question-thumbnail.png";
    return (
        <div className="border-2 border-gray-300 shadow-md hover:shadow-xl rounded-xl p-6 transition-all duration-300 bg-gray-200 cursor-pointer">
            <img
                src={image || defaultImage}
                alt={name}
                className="w-full h-48 object-cover rounded-lg mb-6"
            />
            <h2 className="text-2xl font-bold text-center text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                {name}
            </h2>
            <p className="text-gray-700 text-center mb-4 leading-relaxed">{description}</p>
            <hr className="my-4 border-gray-300" />
            <p className="text-gray-600 text-center"><strong>Type:</strong> {type}</p>
            <div className="text-center mt-4">
                <span className="inline-block bg-amber-200 text-gray-800 text-xs px-3 py-1 rounded shadow mr-2">
                    Rented: {new Date(rentalStartTime).toLocaleDateString()}
                </span>
            </div>
        </div>
    );
};

HistoryResourceCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string,
    rentalStartTime: PropTypes.string.isRequired,
};

export default HistoryResourceCard;