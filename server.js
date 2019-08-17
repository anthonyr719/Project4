require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const axios = require('axios');

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

// app.use('/auth/login', loginLimiter);
// app.use('/auth/signup', signupLimiter);

app.get('/test', (req, res) => {
    let config = {
        headers: {
            "Authorization": {
                "X-RapidAPI-Key": "26689b90c8msh4e241c3890fb264p18d105jsnd4e0a1699fb2"
            }
        }
    }
    console.log('at back, ready to get data from api')
    axios.get(`https://chicken-coop.fr/rest/games?title=mario`, config).then( (response) => {
        console.log('get data back: ', response.data);
        res.json(response.data);
    }).catch(err => {
        console.log('errors from chicken-coop: ', err);
    })
})

app.use('/auth', require('./routes/auth'));
app.use('/api', expressJWT({secret: process.env.JWT_SECRET}), require('./routes/api'));

app.listen(process.env.PORT, () => {
    console.log(`You are listening to ${process.env.PORT}...`);
})






