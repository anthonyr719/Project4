import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import GamesList from './GamesList';

function Home() {
  const [games, setGames] = useState([])
  const [gameId, setGameId] = useState([])

  let config = {
        headers: {
            "Authorization": {
                "X-RapidAPI-Key": "26689b90c8msh4e241c3890fb264p18d105jsnd4e0a1699fb2"
            }
        }
    }

  useEffect( () => {
      axios.get('/test').then(response => {
          console.log('get data back from backend', response.data.result);
          setGames(response.data.result);
      })
    // console.log("Running the effect")
    // axios.get(`https://chicken-coop.fr/rest/games?title=mario`, config).then( (response) => {
    //   setGames(response.data.result);
    // }).catch(err => {
    //     console.log('errors from chicken-coop: ', err);
    // })
  }, [])

  return (
    <>
    <div>
      Games:
      <GamesList games={games}/>
      {/* {games.title} */}
    </div>

    </>
  );
}

export default Home;