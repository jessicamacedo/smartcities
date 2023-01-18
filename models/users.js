
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const DevicesSchema = require('./devices').schema;

// Define schema
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
    email: {
        type: String,
        unique: true,
        required: true,
      },
    password: {
        type: String,
        required: true,
      },
    address: {
        type: String,
        required: true,
      },
    zipCode: {
        type: String,
        required: true,
      },
    userType:  {
        type: String,
        required: true,
        enum: ["domestic", "manager", "admin"],
      },
    createdDate: { 
        type: Date,
        default: Date.now() 
    },
   /* devices: [ DevicesSchema]*/
});

//set hash password
UsersSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});


// Compile model from schema
const UsersModel = mongoose.model("Users", UsersSchema);

module.exports = { UsersModel };