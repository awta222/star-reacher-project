const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const themeSchema = new Schema({
    id: Number,
    themeName: String,
    source: String,
    ASBonusIndex: Number,
    skillBonusIndex: Number
});

module.exports = mongoose.model('themes', themeSchema);