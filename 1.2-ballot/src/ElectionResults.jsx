const ElectionResults = ({democrats, republicans, independents}) => {
    return (
        <div className="stats-container">
            <h4>
                {
                    democrats+republicans+independents === 0 ?
                    "Election Results" : 
                    "Vote Statistics"
                }
            </h4>
            {
                democrats+republicans+independents===0 ? 
                <p className="error">Currently, the system has not received any votes yet</p> : 
                <div>
                    <p>Votes cast: {democrats+republicans+independents}</p>
                    <p>Democratic votes: {Math.round(democrats / (democrats+republicans+independents) * 100)}%</p>
                    <p>Republican votes: {Math.round(republicans / (democrats+republicans+independents) * 100)}%</p>
                    <p>Independent votes: {Math.round(independents / (democrats+republicans+independents) * 100)}%</p>
                </div>
            }
            
        </div>
    )
}

export default ElectionResults;