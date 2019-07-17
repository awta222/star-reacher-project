const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

const dbURL = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost:27017/starreacher';

mongoose.Promise = global.Promise;

mongoose.connect(dbURL, { useNewUrlParser: true }).then(
    () => {console.log('Connected to mongo at ' + dbURL)},
        err => {console.log(`Cannot connect to the database ${dbURL}: ${err}`)}
);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/api'));

//app.get('/', (req, res) => {});
//app.get('/other', (req, res) => res.send('hello other!'));

app.listen(port, () => console.log(`Listening on port ${port}!!`));



