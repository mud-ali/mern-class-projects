import axios from 'axios';
const API_URL = '/api/playlists'

const getPlaylists = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

const addPlaylist = async (playlist, token) => {
    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, playlist, authorization);
    return response.data;
};
export default {getPlaylists, addPlaylist};