import republican from "./republican.png";
import democratic from "./democratic.png";
import american from "./american.png";

const Ballot = ({democrats, republicans, independents, setDemocrats, setRepublicans, setIndependents}) => {
    return (
        <div className="party-container">
            <div className="party">
                <h2>Democrats</h2>
                <div className="box blue">
                    <img src={democratic} alt="Democrats" className="party-image" />
                    <br />
                    <button
                        className="vote-button"
                        onClick={()=>setDemocrats(democrats + 1)}
                    >Vote</button>
                    <p className="vote-count">Vote Count: {democrats}</p>
                </div>
            </div>

            <div className="party">
                <h2>Republicans</h2>
                <div className="box red">
                    <img src={republican} alt="Republicans" className="party-image" />
                    <br />
                    <button
                        className="vote-button"
                        onClick={()=>setRepublicans(republicans + 1)}
                    >Vote</button>
                    <p className="vote-count">Vote Count: {republicans}</p>
                </div>
            </div>

            <div className="party">
                <h2>Independent</h2>
                <div className="box yellow">
                    <img src={american} alt="Independents" className="party-image" />
                    <br />
                    <button
                        className="vote-button"
                        onClick={()=>setIndependents(independents + 1)}
                    >Vote</button>
                    <p className="vote-count">Vote Count: {independents}</p>
                </div>
            </div>
        </div>
    )
}

export default Ballot;