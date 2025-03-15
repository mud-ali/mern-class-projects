const Playlist = ({playlist}) => {
    return (
        <div>
            Playlist: {playlist.name}, created by {playlist.creator}
        </div>
    )
}

export default Playlist