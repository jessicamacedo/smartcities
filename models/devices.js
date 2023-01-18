
const mongoose = require("mongoose");

// Define schema
const Schema = mongoose.Schema;

const DevicesSchema = new Schema({
    description: {
        type: String,
        required: true,
      },
    type: {
        type: String,
        required: true,
        enum: ["solarpanel", "carcharger", "energystore"],
      },
    latitude: {
        type: String,
        required: false,
      },
    longitude: {
        type: String,
        required: true,
      },
    user: {
        type: String,
        required: true,
      },
    createdDate: { 
        type: Date,
        default: Date.now() 
    }
});

// Compile model from schema
const DevicesModel = mongoose.model("Devices", DevicesSchema);

module.exports = { DevicesModel };