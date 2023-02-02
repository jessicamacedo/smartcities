
const mongoose = require("mongoose");

// Define schema
const Schema = mongoose.Schema;

const DevicesSchema = new Schema({
  deviceId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["solarpanel", "windpower", "hydropower", "energystorage"],
  },
  location: {
    type: String,
    required: true,
  },
  deviceName: {
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
    default: new Date()
  }
});

// Compile model from schema
const DevicesModel = mongoose.model("Devices", DevicesSchema);

module.exports = { DevicesModel };