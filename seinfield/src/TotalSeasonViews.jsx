const TotalSeasonViews = (props) => {
  return (
    <p>
        Season 1, Number of Views { 
            props.episodeDetails.map(det => det.views).reduce((sum,v)=>v+sum).toLocaleString("en-us")
        }
    </p>
  );
}

export default TotalSeasonViews