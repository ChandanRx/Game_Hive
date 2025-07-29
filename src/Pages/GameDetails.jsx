import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      const res = await fetch(`https://api.rawg.io/api/games/${id}?key=b775a3aabd2d43c78633293f68fa07b0`);
      const data = await res.json();
      setGame(data);
    };
    fetchGameDetails();
  }, [id]);

  if (!game) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <img src={game.background_image} alt={game.name} className="rounded-xl mb-4" />
      <h1 className="text-3xl font-bold mb-2">{game.name}</h1>
      <p className="mb-4">{game.description_raw}</p>
      <div className="space-y-2">
        <p><strong>Released:</strong> {game.released}</p>
        <p><strong>Rating:</strong> {game.rating} / {game.rating_top}</p>
        <p><strong>Genres:</strong> {game.genres.map(g => g.name).join(', ')}</p>
        <p><strong>Platforms:</strong> {game.platforms.map(p => p.platform.name).join(', ')}</p>
      </div>
    </div>
  );
};

export default GameDetails;
