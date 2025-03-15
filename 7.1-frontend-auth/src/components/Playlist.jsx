const Playlist = ({data}) => {
    return (
        <div>
            Playlist: {data.name}, created by {data.creator}
        </div>
    )
}

export default Playlist