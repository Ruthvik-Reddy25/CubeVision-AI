import axios from "axios";

const api = axios.create({
    baseURL: "https://cubevision-ai.onrender.com"
});

export default api;