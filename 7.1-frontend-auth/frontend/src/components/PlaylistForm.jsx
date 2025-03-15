const PlaylistForm = ({ handlePlaylist, name, setName, creator, setCreator, numSongs, setNumSongs }) => {
    return (
        <form onSubmit={handlePlaylist}>
            <label>
                Playlist Name:
                <input
                    type="text"
                    placeholder="Playlist Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Creator:
                <input
                    type="text"
                    placeholder="Creator"
                    value={creator}
                    onChange={(e) => setCreator(e.target.value)}
                />
            </label>
            <label>
                Number of songs:
                <input
                    type="number"
                    placeholder="Number of songs"
                    value={numSongs}
                    onChange={(e) => setNumSongs(e.target.value)}
                />
            </label>
            <button type="submit">Add Playlist</button>
        </form>
    );
};

export default PlaylistForm;