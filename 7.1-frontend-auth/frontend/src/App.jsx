import { useState, useEffect } from "react";
import './App.css'
import playlistService from "./services/playlistService";
import Playlist from "./components/Playlist";
import GreetingLogout from "./components/GreetingLogout";
import Login from "./components/Login";
import Notification from "./components/Notification";
import loginService from "./services/loginService";
import Section from "./components/Section";
import PlaylistForm from "./components/PlaylistForm";

function App() {
    const [playlists, setPlaylists] = useState([]);
    const [message, setMessage] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [userObject, setUserObject] = useState(null);

    const [playlistName, setPlaylistName] = useState("")
    const [creator, setCreator] = useState("");
    const [numSongs, setNumSongs] = useState(0);


    useEffect(() => {
        const loggedUser = localStorage.getItem("user");
        if (loggedUser) {
            setUserObject(JSON.parse(loggedUser));
            fetchPlaylists();
        }
    }, []);

    const fetchPlaylists = async () => {
        try {
            const data = await playlistService.getPlaylists();
            setPlaylists(data);
        } catch (error) {
            setMessage("Error fetching playlists");
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({ username, password });
            setMessage({ message: "Login Successfull", type: "info" });
            setUserObject(user);
            localStorage.setItem("user", JSON.stringify(user));
            fetchPlaylists()
        } catch (error) {
            setMessage({ message: "Invalid Credentials", type: "warning" });
            console.log(error)
        }
        setTimeout(() => {
            setMessage(null);
        }, 3000); 
        setUsername("");
        setPassword("");
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUserObject(null);
    };

    const handlePlaylist = async (e) => {
        e.preventDefault();
        const playlist = { name: playlistName, creator: creator, numOfSongs: numSongs, likes: 0};
        try {
            const created = await playlistService.addPlaylist(playlist, userObject.token);
            setMessage({
                message: `${created.names} is added`,
                type: "info",
            });
            fetchPlaylists();
        } catch (error) {
            setMessage({ message: "Failed to add playlist. "+error.response.data.error, type: "warning" });
        }
        setTimeout(()=>{setMessage(null)}, 3000)
        setPlaylistName("");
        setCreator("");
        setNumSongs(0);
    }

    const handleLike = async (id) => {
        await playlistService.likePlaylist(id);
        fetchPlaylists();
    }

    const handleDelete = async (id) => {
        await playlistService.deletePlaylist(id, userObject.token)
        fetchPlaylists();
    }

    return (
        <div>
            

            {userObject && (
                <GreetingLogout userObject={userObject} handleLogout={handleLogout} />
            )}
            <h2 className="text-center text-2xl font-extrabold block mx-auto my-4">
                Playlists
            </h2>
            {
                userObject ?
                    <div className="flex flex-row justify-around items-center">
                        <Section componentTitle={"Playlists"}>
                            {
                                playlists.map((playlist) => (
                                    <Playlist key={playlist.id} data={playlist} handleLike={handleLike} handleDelete={handleDelete}/>
                                ))
                            }
                        </Section>
                        <Section componentTitle={"Add a Playlist"}>
                            <PlaylistForm 
                                handlePlaylist={handlePlaylist}
                                name={playlistName}
                                setName={setPlaylistName}
                                creator={creator}
                                setCreator={setCreator}
                                numSongs={numSongs}
                                setNumSongs={setNumSongs}
                            />
                        </Section>
                    </div>
                    :
                    (
                        <Login
                            handleLogin={handleLogin}
                            username={username}
                            setUsername={setUsername}
                            password={password}
                            setPassword={setPassword}
                        />
                    )
            }
            <Notification notification={message} />
        </div>
    );
}

export default App;