import React from 'react';
import axios from 'axios';
import { Loader, Container, Table, Modal } from 'semantic-ui-react';
import GameDetail from './GameDetail'
// import FavoriteList from './FavoriteList';


// export default function GamesList (props) {
//     const [game, setName] = {useState}('');
//     const [searchTitle, setSearchTitle] = {useState}('');


class GamesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            favorites: [],
            searchTitle: "",
        }
        this.updateSearchTitle = this.updateSearchTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.updateFavoriteList = this.updateFavoriteList.bind(this);
    }

    async componentDidMount() {
        const favorites = await axios.get(`/favorites?userId=${this.props.user._id}`)
        const gamesList = await axios.get(`http://localhost:3000/games`)
        this.setState({
            games: gamesList.data,
            favorites: favorites.data
        })
    };

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
        // console.log(this.state.searchTitle);
        axios.get(`/games?title=${this.state.searchTitle}`)
            .then(res => {
                console.log("success!", res.data);
                this.setState({
                    games: res.data
                })
            })
            .catch(err => {
                console.log(err);
            }
            );
    }

    // updateFavoriteList(e) {
    //     // console.log(e.target.value)
    //     this.setState ({
    //        favorites: e.target.value
    //     })
    // }


    renderGameDetail = (game) => {
        return <GameDetail game={game} />
    }

    renderGamesList = (list) => {
        return list.length > 0 ? list.map((game, id) => {
            return (
                <Table.Row key={id}>
                    <Table.Cell><a href={`/games/${game.title}/${game.platform}`}>{game.title}</a></Table.Cell>
                    <Table.Cell>{game.platform}</Table.Cell>
                    {/* <Table.Cell><button type="submit">Add To Favorites</button></Table.Cell> */}
                </Table.Row>
            )
        }) : null
    }

    updateSearchTitle(e) {
        // console.log(e.target.value)
        this.setState({
            searchTitle: e.target.value
        })
    }

    render() {
        return (
            <>
                <Container>
                    <h2>Search Games:</h2>
                    <form onSubmit={this.handleSubmit}>
                        <input value={this.state.searchTitle} onChange={this.updateSearchTitle} type="text" />
                        <button>Search</button>
                    </form>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Title</Table.HeaderCell>
                                <Table.HeaderCell>Platform</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.renderGamesList(this.state.games)}
                        </Table.Body>
                    </Table>
                    <h2>Favorites:</h2>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Title</Table.HeaderCell>
                                <Table.HeaderCell>Platform</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.renderGamesList(this.state.favorites)}
                        </Table.Body>
                    </Table>
                </Container>

            </>
        );
    }
}
// }
export default GamesList;