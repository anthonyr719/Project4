import React from 'react';
import axios from 'axios';
import { Dimmer, Loader, Button, Input } from 'semantic-ui-react';


class GameDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: null,
            userFavorites: [],
            isFavorite: false,
            isLoading: false
        }
    }

    async componentDidMount() {
        await this.updateInformation();
    }

    updateInformation = async () => {
        this.setState({isLoading: true });
        const title = this.props.match.params.title
        const platform = this.props.match.params.platform
        const userFavorites = await axios.get(`/favorites?userId=${this.props.user._id}`)
        const gameDetails = await axios.get(`/games/${title}?platform=${platform}`)
        console.log(userFavorites);
        const userFavorite = userFavorites.data.find((game) => {
            return game.title === gameDetails.data.title && game.platform === this.props.match.params.platform
        })
        this.setState({
            game: { ...gameDetails.data, platform: this.props.match.params.platform },
            userFavorites: userFavorites.data,
            userReview: userFavorite ? userFavorite.userReview : null,
            isFavorite: !!userFavorite
        }, () => {this.setState({ isLoading: false }) })
    }

    onClickAddToFavorites = async () => {
        const response = await axios.post(`/games/favorites`, {
            user: this.props.user,
            game: { ...this.state.game, platform: this.props.match.params.platform },
        })
        await this.updateInformation();
        console.log(response);
    }

    onChangeReview = (e) => {
        this.setState({userReview: e.target.value });
    }

    onClickUpdateReview = () => {
        // put request to update review
    }

    onClickRemoveFromFavorites = async () => {
        const response = await axios.delete(
            `/games/favorites/${this.state.game.title}/${this.props.match.params.platform}/${this.props.user._id}`
            )
            console.log('new favs', response.data)
        await this.updateInformation()
    }

    renderAddButtonOrReview = () => {
        if (!this.state.isFavorite) {
            return (
                <Button onClick={this.onClickAddToFavorites}primary>Add to Favorites</Button>
            )
        } else {
            return (
                <>
                <Input value={this.state.userReview} onChange={this.onChangeReview}/>
                <Button onClick={this.onClickUpdateReview}>Update Review</Button>
                <Button onClick={this.onClickRemoveFromFavorites}>Remove from Favorites</Button>
                </>
            )
        }
    }

    renderGameDetails = () => {
        if (this.state.isLoading || !this.state.game){
            // loader needs an "active" prop to be shown
            return (
                <Dimmer active>
                    <Loader />
                </Dimmer>
            )
        } else {
            return(
                <div>
                    <div><img src={this.state.game.image} /></div>
                    <div><h1>{this.state.game.title}</h1></div>
                    <div><p>{this.state.game.description || ''}</p></div>
                    {this.renderAddButtonOrReview()}
                </div>
            )
        }
    }

    render() {
        return this.renderGameDetails()
    }
}

export default GameDetail;