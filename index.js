const express = require('express');
const app = express();
const path = require('path');
const port = process.env.port || 80;

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/api'));

//app.get('/', (req, res) => {});
//app.get('/other', (req, res) => res.send('hello other!'));

app.listen(port, () => console.log(`Listening on port ${port}!!`));
