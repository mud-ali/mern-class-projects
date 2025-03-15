const PlaylistForm = ({ handlePlaylist, name, setName, creator, setCreator, numSongs, setNumSongs }) => {
    return (
        <form onSubmit={handlePlaylist} className="space-y-4">
            <div className="flex flex-col">
                <label className="mb-2 font-semibold">Playlist Name:</label>
                <input
                    type="text"
                    placeholder="Playlist Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="flex flex-col">
                <label className="mb-2 font-semibold">Creator:</label>
                <input
                    type="text"
                    placeholder="Creator"
                    value={creator}
                    onChange={(e) => setCreator(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="flex flex-col">
                <label className="mb-2 font-semibold">Number of songs:</label>
                <input
                    type="number"
                    placeholder="Number of songs"
                    value={numSongs}
                    onChange={(e) => setNumSongs(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add Playlist</button>
        </form>
    );
};

export default PlaylistForm;