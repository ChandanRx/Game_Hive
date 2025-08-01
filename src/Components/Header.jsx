import React, { useContext, useState } from 'react';
import game from './../assets/Images/logo.png';
import { HiMoon, HiSun } from 'react-icons/hi2';
import { ThemeContext } from '../Context/ThemeContext';

const Header = ({ onSearch }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className={`px-4 py-3 shadow-md sticky top-0 z-50 transition-colors duration-300
      ${theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
        
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <img src={game} width={50} height={50} alt="logo" className="rounded-full" />
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            RxNexus
          </h1>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto"
        >
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[200px] px-3 py-1 rounded bg-gray-100 focus:outline-none text-black"
          />
          <button
            type="submit"
            className="px-4 py-1 rounded-md shadow-sm bg-gray-100 text-gray-800 
              dark:bg-gray-700 dark:text-white 
              hover:bg-gray-300 dark:hover:bg-gray-600 
              disabled:opacity-50"
          >
            Search
          </button>
        </form>

        {/* Theme Toggle */}
        <div className="self-end md:self-auto">
          {theme === 'light' ? (
            <HiMoon
              className="text-3xl text-black bg-slate-200 p-1 rounded-full cursor-pointer"
              onClick={toggleTheme}
            />
          ) : (
            <HiSun
              className="text-3xl text-white bg-slate-600 p-1 rounded-full cursor-pointer"
              onClick={toggleTheme}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
