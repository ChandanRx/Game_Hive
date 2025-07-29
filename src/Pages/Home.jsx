import React, { useEffect, useState } from 'react';
import GenreList from '../Components/GenreList';
import GlobalApi from '../Services/GlobalApi';
import Banner from '../Components/Banner';
import TrendingGames from '../Components/TrendingGames';
import GamesByGenresID from '../Components/GamesByGenresID';

const Home = ({ searchQuery }) => {
  const [allGameList, setAllGameList] = useState([]);
  const [gameListByGenres, setGameListByGenres] = useState([]);
  const [selectedGenresName, setSelectedGenresName] = useState('Action');
  const [selectedGenreId, setSelectedGenreId] = useState(4);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    if (searchQuery) {
      searchGames(searchQuery, currentPage);
    } else {
      getAllGamesList(currentPage);
      getGameListByGenresId(selectedGenreId, currentPage);
    }
  }, [currentPage, searchQuery]);

  const getAllGamesList = (page = 1) => {
    GlobalApi.getAllGames(page, pageSize).then((res) => {
      setAllGameList(res.data.results);
    });
  };

  const getGameListByGenresId = (id, page = 1) => {
    GlobalApi.getGameListByGenreId(id, page, pageSize).then((res) => {
      setGameListByGenres(res.data.results);
      setTotalPages(res.data.count ? Math.ceil(res.data.count / pageSize) : 1);
    });
  };

  const searchGames = (query, page = 1) => {
    GlobalApi.searchGameByName(query, page, pageSize).then((res) => {
      setGameListByGenres(res.data.results);
      setTotalPages(res.data.count ? Math.ceil(res.data.count / pageSize) : 1);
    });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex w-full">
      <aside className="w-[240px] hidden md:block border-r border-gray-700 min-h-screen px-4 py-6">
        <GenreList
          GenreId={(GenreId) => {
            setSelectedGenreId(GenreId);
            setCurrentPage(1);
            getGameListByGenresId(GenreId, 1);
          }}
          selectedGenresName={(name) => setSelectedGenresName(name)}
        />
      </aside>

      <section className="flex-1 px-4 py-6">
        {gameListByGenres.length > 0 && (
          <>
            {!searchQuery && <Banner gameBanner={allGameList[3]} />}
            <GamesByGenresID
              gameList={gameListByGenres}
              selectedGenresName={searchQuery ? `"${searchQuery}" Results` : selectedGenresName}
            />

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 my-6">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg shadow-sm 
               bg-gray-200 text-gray-800 
               dark:bg-gray-700 dark:text-white 
               hover:bg-gray-300 dark:hover:bg-gray-600 
               disabled:opacity-50 disabled:cursor-not-allowed 
               transition-colors duration-200"
              >
                ⬅ Previous
              </button>

              <span className="text-gray-800 dark:text-gray-100 font-medium">
                Page <span className="font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
              </span>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg shadow-sm 
               bg-gray-200 text-gray-800 
               dark:bg-gray-700 dark:text-white 
               hover:bg-gray-300 dark:hover:bg-gray-600 
               disabled:opacity-50 disabled:cursor-not-allowed 
               transition-colors duration-200"
              >
                Next ➡
              </button>
            </div>

            {!searchQuery && <TrendingGames gameList={allGameList} />}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
