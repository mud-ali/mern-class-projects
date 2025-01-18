import Episode from './Episode'

const Episodes = (props) => {
    return (
        <div>
            {
                props.episodeDetails.map((details)=>{
                    return (
                        <Episode {...details}/>
                    )
                })
            }
        </div>
    )
}

export default Episodes