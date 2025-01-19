import "./App.css";
import React, {useState} from "react";
import ElectionResults from "./ElectionResults";
import Ballot from "./Ballot";

const App = () => {
    
    const [democrats, setDemocrats] = useState(0);
    const [republicans, setRepublicans] = useState(0);
    const [independents, setIndependents] = useState(0);
    
    return (
        <main>
            <Ballot 
                democrats={democrats}
                republicans={republicans}
                independents={independents}
                setDemocrats={setDemocrats}
                setRepublicans={setRepublicans}
                setIndependents={setIndependents}
            />
            <ElectionResults
                democrats={democrats}
                republicans={republicans}
                independents={independents}
            />
        </main>
    );
};

export default App;
