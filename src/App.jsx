import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Home from './Pages/Home';
import Header from './Components/Header';
import { ThemeContext } from './Context/ThemeContext';
import GameDetails from './Pages/GameDetails';

function App() {
  const [theme, setTheme] = useState('dark');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    setTheme(saved ? saved : 'dark');
  }, []);

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`${theme} ${theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-gray-100 text-black'} min-h-screen`}>
          <Header onSearch={(query) => setSearchQuery(query)} />
          <main className="flex">
            <Routes>
              <Route path="/" element={<Home searchQuery={searchQuery} />} />
              <Route path="/game/:id" element={<GameDetails />} />
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
