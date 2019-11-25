const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listsSchema = new Schema({
    listName: String,
    list: Array
});

module.exports = mongoose.model('lists', listsSchema, 'lists');