import axios from "axios";

const key = 'b775a3aabd2d43c78633293f68fa07b0';

const axiosCreate = axios.create({
  baseURL: 'https://api.rawg.io/api'
});

const getGenreList = axiosCreate.get('/genres?key=' + key);

// ✅ Accepts page and page_size
const getAllGames = (page = 1, pageSize = 9) =>
  axiosCreate.get(`/games?key=${key}&page=${page}&page_size=${pageSize}`);

// ✅ Accepts genre id + pagination
const getGameListByGenreId = (id, page = 1, pageSize = 9) =>
  axiosCreate.get(`/games?key=${key}&genres=${id}&page=${page}&page_size=${pageSize}`);

// ✅ Search game by name
const searchGameByName = (query, page = 1, pageSize = 9) =>
  axiosCreate.get(`/games?key=${key}&search=${query}&page=${page}&page_size=${pageSize}`);

export default {
  getGenreList,
  getAllGames,
  getGameListByGenreId,
  searchGameByName
};
