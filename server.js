require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const axios = require('axios');
const User = require('./models/user');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(helmet());

const loginLimiter = new RateLimit ({
    windowMs: 5*60*1000,
    max: 3,
    delayMs: 0,
    message: "Maximum login attempts exceeded!"
})
const signupLimiter = new RateLimit({
    windowMs: 60*60*1000,
    max: 3,
    delayMs: 0,
    message: "Maximum accounts created. Please try again later."
})

mongoose.connect('mongodb://localhost/jwtAuth', {useNewUrlParser: true});
const db = mongoose.connection;
db.once('open', () => {
    console.log(`Connected to Mongo on ${db.post}:${db.port}`);
})
db.on('error', (err) => {
    console.log(`Database error:\n${err}`);
});

const chickenCoopHeader = {
    headers: {
            "x-rapidapi-key": "26689b90c8msh4e241c3890fb264p18d105jsnd4e0a1699fb2"
    }
}

const chickenCoopToRapidApi = {
    "PS4": "playstation-4",
    "iOS": "ios",
    "Switch": "switch",
    "PC": "pc",
    "X360": "xbox-360",
    "WII": "wii",
    "PSP": "psp",
    "PS2": "playstation-2",
    "PS3": "playstation-3",
    "3DS": "3-ds",
    "WIIU": "wii-u",
}


app.get('/games', async(req, res) => {
    const queryParams = req.query
    const title = queryParams && queryParams.title ? queryParams.title : ""
    const searchResult = await axios.get(`https://chicken-coop.fr/rest/games?title=${title}`)
    res.json(searchResult.data.result);  
})

app.get('/games/:title', async (req, res) =>{
    const title = req.params.title
    const platform = chickenCoopToRapidApi[req.query.platform]
    const searchSingleGame = await axios.get(`https://chicken-coop.p.rapidapi.com/games/${title}?platform=${platform}`, chickenCoopHeader)
    res.json(searchSingleGame.data.result);
})

app.get('/favorites', async (req, res) => {
    const userId = req.query.userId
    const user = await User.findById(userId)
    res.json(user.favorites)
})

// app.post adding favs DONE!!!!
app.post('/games/favorites', async (req, res) =>{
    const favorite = {
        _user: req.body.user._id,
        userReview: "",
        title: req.body.game.title,
        platform: req.body.game.platform,
        description: req.body.game.description,
        image: req.body.game.image
    }
    const user = await User.findById(req.body.user._id)
    user.favorites.push(favorite)
    await user.save()
    res.json(user)
})


// app.put rating
// app.put('')


// app.delete kill it!! 
app.delete('/games/favorites/:title/:platform/:userId', async (req, res) => {
    const title = req.params.title
    const platform = req.params.platform
    const user = await User.findById(req.params.userId)
    console.log(title, platform, user)
    const updatedFavorites = user.favorites.filter((game) => {
        return !(game.title === title && game.platform === platform)
    })
    user.favorites = updatedFavorites;
    await user.save();
    res.json(user.favorites)
})

app.use('/auth/login', loginLimiter);
app.use('/auth/signup', signupLimiter);

// app.get('/test', (req, res) => {
//     console.log('at back, ready to get data from api')
//     axios.get(`https://chicken-coop.fr/rest/games?title=mario`, chickenCoopHeader).then( (response) => {
//         console.log('get data back: ', response.data);
//         res.json(response.data);
//     }).catch(err => {
//         console.log('errors from chicken-coop: ', err);
//     })
// })

app.use('/auth', require('./routes/auth'));
app.use('/api', expressJWT({secret: process.env.JWT_SECRET}), require('./routes/api'));

app.listen(process.env.PORT, () => {
    console.log(`You are listening to ${process.env.PORT}...`);
})






