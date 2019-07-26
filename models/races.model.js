const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const raceSchema = new Schema({
    id: Number,
    raceName: String,
    AS: Array,
    size: String,
    HP: Number,
    skillBonuses: Array
});

module.exports = mongoose.model('races', raceSchema);