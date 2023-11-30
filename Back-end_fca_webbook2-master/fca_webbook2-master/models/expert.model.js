const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const expertSchema = new Schema({
    name: String,
    animal: String,
    group: String,
    years_experted: Number,
    description: String,
    img:String,
    value:Number,
    contact:String,
    location: {
        city: String,
        country: String
    },
    active: {
        type: Boolean,
        default: true
    },
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.expert, expertSchema);