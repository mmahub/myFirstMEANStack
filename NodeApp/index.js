
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const users = require('./routes/users');
const login = require('./routes/login');
const statustypes = require('./routes/statusTypes');
const task = require('./routes/tasks')


mongoose.connect('mongodb://localhost/myMEANStackApp',  { useNewUrlParser: true, useUnifiedTopology: true } )
    .then( () => { console.log('Successfully connected to MongoDB...') })
    .catch( (err) => { console.error('Could not connect to MongoDB: ' + err) }) ;

// connecting with angularApp running on below link    
app.use(express.json({ origin: 'http://localhost:4200' }))

app.use(cors())
app.use('/users', users)
app.use('/login', login)
app.use('/statustypes', statustypes)
app.use('/task', task)

const port = process.env.PORT || 3000 ;
app.listen(port, () => console.log(`Listening on port ${port}...`) );    