const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
    itemName: String,
});

module.exports = mongoose.model('equipment', equipmentSchema, 'equipment');