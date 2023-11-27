const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const sponsorSchema = new Schema({

    name: String,
    contact:String,
    animals: {type: Schema.ObjectId, ref: "Animal"},
        value: Number,
    })


module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.sponsor, sponsorSchema);