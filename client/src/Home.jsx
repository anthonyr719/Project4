import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import GamesList from './GamesList';


function Home() {
  const [games, setGames] = useState([])
  const [gameId, setGameId] = useState([1])
  const [singleGame, setSingleGame] = useState({})
  const [favorites, setFavorites]  = useState([])

  const addToFavorites = (games) => {
    const newGameFavs = [...favorites, games]
    setFavorites(newGameFavs);
  }

//   useEffect( () => {
//     console.log("Running the first effect")
//     axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`).then( (response) => {
//       setPokemon(response.data.results);
//       console.log(response.data.results)
//     })
//   }, [])



  return (
    <>
    <div>
      {/* Games: */}
      <GamesList games={games}/>
      {/* {games.title} */}
    </div>

    </>
  );
}

export default Home;