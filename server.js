const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const auth = process.env.PROD_MONGODB ? undefined : require('./config');

const dbUrl = process.env.PROD_MONGODB ? process.env.PROD_MONGODB : auth.db;

mongoose.Promise = global.Promise;

mongoose.connect(dbUrl, {useNewUrlParser: true,  useUnifiedTopology: true})
    .then(() => {console.log('Connected to Mongo!')},
        err => {console.log(`Cannot connect to the database: ${err}`)}
);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/search', (req,res) => {
  res.sendFile(__dirname + '/public/search.html');
});

app.get('/inventory', (req,res) => {
  res.sendFile(__dirname + '/public/inventory.html');
});

app.use('/wizard', require('./routes/wizard'));
app.use('/search', require('./routes/search'));

app.listen(port, () => console.log(`Listening on port ${port}!!`));