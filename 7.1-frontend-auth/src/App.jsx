import { useState, useEffect } from "react";
import './App.css'
import playlistService from "./services/playlistService";
import Playlist from "./components/Playlist";

function App() {
    const [user, setUser] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // const loggedUser = localStorage.getItem("user");
        // if (loggedUser) {
        //     setUser(JSON.parse(loggedUser));
        //     fetchPlaylists();
        // }
        playlistService.getPlaylists().then(p=>setPlaylists(p))
    }, []);

    const fetchPlaylists = async () => {
        try {
            const data = await playlistService.getPlaylists();
            setPlaylists(data);
        } catch (error) {
            setMessage("Error fetching playlists");
        }
    };

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        fetchPlaylists();
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        setPlaylists([]);
    };

    return (
        <div>
            <h2>Playlists</h2>
            {
                playlists.map((playlist) => (
                    <Playlist key={playlist.id} data={playlist} />
                )) 
            }
        </div>
    );
}

export default App;