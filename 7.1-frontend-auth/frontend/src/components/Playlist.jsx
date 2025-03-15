import React, { useState } from 'react';

const Playlist = ({ data, handleLike, handleDelete }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="border border-gray-300 p-4 rounded-md max-w-xs mx-auto my-2">
            {showDetails ? (
                <>
                    <p className="text-sm">Name: {data.name}</p>
                    <p className="text-sm text-gray-600">Created by: {data.creator}</p>
                    <p className="text-sm">Songs: {data.numOfSongs ?? 0}</p>
                    <p className="text-sm">Likes: {data.likes}</p>
                    <button className="text-white font-bold" onClick={()=>handleLike(data.id)}>
                        Like
                    </button>
                    <button className="text-red-400 font-bold" onClick={() => handleDelete(data.id)}>
                        Delete
                    </button>
                    <button 
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={toggleDetails}
                    >
                        Hide Details
                    </button>
                </>
            ) : (
                <>
                    <h3 className="text-lg font-semibold">Playlist: {data.name}</h3>
                    <button 
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={toggleDetails}
                    >
                        Show Details
                    </button>
                </>
            )}
        </div>
    );
};

export default Playlist;