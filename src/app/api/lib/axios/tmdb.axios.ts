import axios from "axios";

const tmdbAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
});

export default tmdbAxios;
