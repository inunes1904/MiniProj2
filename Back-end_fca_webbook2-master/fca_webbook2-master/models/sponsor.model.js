const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const sponsorSchema = new Schema({
    name: String,
    contact: String,
    value: Number,
    contractYears: Number,
    animal: {
        type:Schema.Types.ObjectId,
        ref:"Animal"
        },
    active: {
        type: Boolean,
        default: true
    },
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.sponsor, sponsorSchema);