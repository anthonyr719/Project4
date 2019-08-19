import React from 'react';
import axios from 'axios';
import {Loader, Container, Table} from 'semantic-ui-react';


class GamesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            title: "" 
        }
        this.updateGameTitle = this.updateGameTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        const gamesList = await axios.get(`http://localhost:3000/games`)  
        this.setState({
            games: gamesList.data
        })
    };

    // function GamesList(games, handleGamesDetail, addToFavorites) {
    //     const [games, setGames] = useState([])
    //     const [title, setTitle] =  
    // }


    // function GamesList({pokemon, handlePokemonDetail, addToFavorites}) {
    //     let content;
    //         content = pokemon.map((pokemon, id) => {
    //             return (
    //                 <div key={id}>
    //                     <button onClick={()=>addToFavorites(pokemon.name)} type="submit">Add to Favorites</button>
    //                     <p onClick={()=>handlePokemonDetail(pokemon.name)}>{pokemon.name}</p>
    //                 </div>
    
    //         )
    //     })


    handleSubmit(e) {
        e.preventDefault()
        console.log(this.state.title);
        axios.get(`/games?title=${this.state.title}`)
            .then(res => {
                console.log("success!", res.data);
                this.setState({
                    games: res.data
                })
            })
            .catch(err => {
                console.log(err);
            // this.setState({
            //     message: "Maximum accounts exceeded. Please try again later."
            // })
        });
    }


    renderGamesList = () => {
        return this.state.games.length > 0 ? this.state.games.map((games, id) => {
            return (
                <Table.Row key={id}>
                    <Table.Cell><p onClick>{games.title}</p></Table.Cell>
                    <Table.Cell>{games.platform}</Table.Cell>
                    <Table.Cell><button>Add To Favorites</button></Table.Cell>
                </Table.Row>
            )
        }) : null
    }
    updateGameTitle(e) {
        this.setState ({
           title: e.target.value
        })
     }
    
    render() {
        return (
            <Container>
                Games:
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.title} onChange={this.updateGameTitle} type="text"/>
                    <button>Search</button>
                </form>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Platform</Table.HeaderCell>
                            <Table.HeaderCell>Favorite</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderGamesList()}
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}

export default GamesList;