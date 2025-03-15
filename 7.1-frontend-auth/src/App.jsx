import { useState, useEffect } from "react";
import './App.css'
import playlistService from "./services/playlistService";
import Playlist from "./components/Playlist";
import GreetingLogout from "./components/GreetingLogout";
import Login from "./components/Login";
import Notification from "./components/Notification";
import loginService from "./services/loginService";

function App() {
    const [playlists, setPlaylists] = useState([]);
    const [message, setMessage] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [userObject, setUserObject] = useState(null);


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

    return (
        <div>
            <Notification notification={message} />

            {userObject && (
                <GreetingLogout userObject={userObject} handleLogout={handleLogout} />
            )}
            <h2 className="text-center text-2xl font-extrabold block mx-auto my-4">
                Playlists
            </h2>
            {
                userObject ?
                    <div className="mx-auto text-center">
                        {
                            playlists.map((playlist) => (
                                <Playlist key={playlist.id} data={playlist} />
                            ))
                        }
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

        </div>
    );
}

export default App;