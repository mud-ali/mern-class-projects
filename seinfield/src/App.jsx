import ShowTitle from './ShowTitle'
import Episodes from './Episodes'
import TotalSeasonViews from './TotalSeasonViews';

const App = () => {
  const season = "Seinfeld Season 1";
  const episodeDetails = [
    {
        title: "Good News, Bad News",
        views: 6905040,
    },
    {
        title: "The Stakeout",
        views: 3905040,
    },
    {
        title: "The Robbery",
        views: 4498237
    }
  ]
  return (
    <div>
      <ShowTitle season={season} />
      <Episodes episodeDetails={episodeDetails} />
      <TotalSeasonViews episodeDetails={episodeDetails} />
    </div>
  );
};

export default App;