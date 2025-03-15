const Playlist = ({data}) => {
    return (
        <div>
            Playlist: {data.name}, created by {data.creator}
                ;
            Songs: {data.numOfSongs ?? 0}
        </div>
    )
}

export default Playlist