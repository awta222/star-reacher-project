const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

const auth = process.env.PROD_MONGODB ? undefined : require('./config');

const dbUrl = process.env.PROD_MONGODB ? process.env.PROD_MONGODB : auth.db;

mongoose.Promise = global.Promise;

mongoose.connect(dbUrl, {useNewUrlParser: true})
    .then(() => {console.log('Connected to Mongo!')},
        err => {console.log(`Cannot connect to the database: ${err}`)}
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/wizard', require('./routes/wizard'));

app.listen(port, () => console.log(`Listening on port ${port}!!`));
