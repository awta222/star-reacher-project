const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const themeDescSchema = new Schema({
    themeName: String,
    Source: String,
    description: String,
    AS: String,
    themeAbilities: Object
});

module.exports = mongoose.model('themeDescriptions', themeDescSchema, 'themeDescriptions');