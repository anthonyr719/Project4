import React, {useState, useEffect}from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import GamesList from './GamesList';
import GameDetail from './GameDetail';


  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        token: '',
        user: null,
        errorMessage: '',
        apiData: null
      }
    this.checkForLocalToken = this.checkForLocalToken.bind(this);
    this.liftToken = this.liftToken.bind(this);
    this.logout = this.logout.bind(this);
  }


  checkForLocalToken() {
    var token = localStorage.getItem('mernToken');
    if (!token || token === 'undefinded') {
      // Token is invalid or missing
      localStorage.removeItem('mernToken');
      this.setState({
        token: '',
        user: null
      })
    } else {
      // we found a token in local storage, verify it
      axios.post('/auth/me/from/token', {token})
        .then( res => {
          if (res.data.type === 'error') {
            localStorage.removeItem('mernToken')
            this.setState({
              token: '',
              user: null,
              errorMessage: res.data.message
            })
          } else {
            localStorage.setItem('mernToken', res.data.token);
            this.setState({
              token: res.data.token,
              user: res.data.user,
              errorMessage: ''
            })
          }
        })
    }
  }

  liftToken({token, user}) {
    this.setState({
      token,
      user
    })
  }

  logout() {
    // remove token from local storage
    localStorage.removeItem('mernToken');
    // remove user and token from stat
    this.setState({
      token: '',
      user: null
    })
  }
  
  // 
  // 

  componentDidMount() {
    this.checkForLocalToken()
  }

  render() {
    var user = this.state.user
    var contents
    if (user) {
      contents = (
        <>
          <button onClick={this.logout}>Logout</button>
          <button onClick={() => window.location.replace('/')}>Home</button>
          <button onClick={() => window.location.replace('/favorites')}>My Favorites</button>
          <Router>
            <Route exact path='/' render={(props) => <GamesList {...props} user={user} />} />
      <Route exact path='/games/:title/:platform' render={(props) => <GameDetail {...props} user={user}/>}/>
            {/* <Route exact path='/faves' render={(props)=> <DisplayMap {...props} />} /> */}
          </Router>
        {/* <p>Hello, {user.name}</p> */}
        {/* <Home  user={user}/> */}
        </>
      )
    } else {
      contents = (
        <>
        <p>Please signup or login</p>
        <Login liftToken={this.liftToken} />
        <Signup liftToken={this.liftToken} />
        </>
      );
    }
    return(
      <>
      {contents}
      {/* <Home /> */}
      </>
    );
  }
}

export default App;
