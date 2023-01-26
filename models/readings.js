
const mongoose = require("mongoose");

// Define schema
const Schema = mongoose.Schema;

const ReadingsSchema = new Schema({
    deviceId: {
        type: String,
        required: true,
      },
    type: {
        type: String,
        required: true,
        enum: ["solarpanel", "energystore"],
      },
    consumption: {
        type: String,
        required: true,
      },
    production: {
        type: String,
        required: true,
      },
    createdDate: { 
        type: Date,
        default: Date.now() 
    }
});

// Compile model from schema
const ReadingsModel = mongoose.model("Readings", ReadingsSchema);

module.exports = { ReadingsModel };