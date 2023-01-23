
const mongoose = require("mongoose");

// Define schema
const Schema = mongoose.Schema;

const DevicesSchema = new Schema({
    deviceName: {
        type: String,
        required: true,
      },
    type: {
        type: String,
        required: true,
        enum: ["solarpanel", "carcharger", "energystore"],
      },
    location: {
        type: String,
        required: true,
      },
    userId: {
        type: String,
        required: true,
      },
    email: {
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