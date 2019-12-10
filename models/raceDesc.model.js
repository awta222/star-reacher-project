const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const raceDescSchema = new Schema({
    raceName: String,
    Source: String,
    description: String,
    AS: String,
    HP: String,
    sizeType: String,
    racialAbilities: Object
});

module.exports = mongoose.model('raceDescriptions', raceDescSchema, 'raceDescriptions');