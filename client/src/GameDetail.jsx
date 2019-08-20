import React from 'react';
import axios from 'axios';
import { Loader, Container, Button } from 'semantic-ui-react';


class GameDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: null
        }
    }

    async componentDidMount() {
        const title = this.props.match.params.title
        const platform = this.props.match.params.platform
        const gameDetails = await axios.get(`/games/${title}?platform=${platform}`)
        this.setState({game: gameDetails.data})
    }

    renderGameDetails = () => {
        if (!this.state.game){
            // loader needs an "active" prop to be shown
            return (
                <Container>
                    <Loader active inverted/>
                </Container> 
            )
        } else {
            return(
                <div>
                    {this.state.game.title}
                    {this.state.game.developer}
                    {this.state.game.description}
                    <img src={this.state.game.image} />
                    <Button primary>Add to Favorites</Button>
                </div>
            )
        }
    }

    render() {
        // console.log(this.props)
        return this.renderGameDetails()
    }
}

// function GameDetail({singlePokemon, pokemonId}) {
//     let content;
//     if (Object.keys(pokemonId).length > 0) {
//         content = (
//             <div>
//                 <h1>DATA:</h1>
//                 <h2>Name:{singlePokemon.name}</h2>
//                 <h3>Height:{singlePokemon.height}</h3>
//                 <h3>Weight:{singlePokemon.weight}</h3> 
//                 <img src={singlePokemon.sprites.front_default} alt="" />
//             </div> 
//         )
//     } else {
//         content = <p>No Game selected</p>
//     }
//     return (
//         <>
//             {content}
//         </>
//     );     
// }

export default GameDetail;