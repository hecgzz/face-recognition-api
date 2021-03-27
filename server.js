const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const singin = require('./controllers/singin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
    host : 'postgresql-regular-67187',
    user : 'postgres',
    password : 'epyrus',
    database : 'face-recognition'
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send('success');
})
app.post('/signin', (req, res)=> {singin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, db)})
app.get('/profile/:id', (req, res,)=> {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res)=> image.handleImage(req, res, db))
app.post('/imageurl', (req, res)=> image.handleApiCall(req, res))

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app is running on port ${process.env.PORT}`);
})


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/