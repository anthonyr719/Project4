import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import GamesList from './GamesList';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import GameDetail from './GameDetail';


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
    <Router>
        <Route exact path='/' render={<GamesList games={games}/>} />
        <Route exact path='/games/:title/:platform' render={(props)=> <GameDetail {...props}/>}/>
        {/* <Route exact path='/faves' render={(props)=> <DisplayMap {...props} />} /> */}
    </Router>
    </div>

    </>
  );
}

export default Home;