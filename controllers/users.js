/***
 *  Jéssica Macedo 
 *  Last modified 21/01/2023
 */

var { ErrorResponse, SuccessResponse } = require('../controllers/response');
const { UsersModel } = require("../models/users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const JWTSECRET = process.env.JWTSECRET;
const { GetLanguage } = require("../helpers/getLanguage")
const { JoiCreateUserValidation, JoiGetUserLoginValidation } = require("../validations/apiValidations")


/**
 * Function to receive request from api, create a user on database and send result back
 */
CreateUser = async function (req, res) {
    try {
        //Validate input parameters and body from api
        let inputValidation = await JoiCreateUserValidation(req.query, req.body);
        // console.log(inputValidation)

        if (inputValidation.isValid === true) {
            // If input data is valid, creates new model UsersModel and inserts on database
            const newUser = new UsersModel(req.body);
            const addUser = await newUser.save(req.body);

            if (addUser._id) {
                //If the _id field was generated on the document it returns a success response with dynamic translation
                res.status(201).send(SuccessResponse(GetLanguage(req.query.language).createdUser));
            } else {
                // console.error(error)
                //Returns the database error saving user
                res.status(500).send(ErrorResponse(error));
            }
        } else {
            //Send Bad Request with validation error message
            res.status(400).send(ErrorResponse(inputValidation.message));
        }

    } catch (e) {
        // console.error(e);
        if (e.code === 11000) {
            // Returns status code 409 (conflict) and message user already exists
            res.status(409).send(ErrorResponse(GetLanguage(req.query.language).duplicatedUser));
        } else {
            res.status(500).send(ErrorResponse(e));
        }
    }
}



/**
 * Function to validate the credentials of the user and return the JWT token for login
 */
GetUserLogin = async function (req, res) {
    try {
        //Validate input parameters and body from api
        let inputValidation = await JoiGetUserLoginValidation(req.query);
        //console.log(inputValidation)

        if (inputValidation.isValid === true) {
            //console.log(req.query)

            // If input data is valid, find one document on database with the unique value "email"
            const user = await UsersModel.findOne({ "email": req.query.email });
            //console.log('user: ' + user)

            //Validation of the password saved on database with the password received on api
            var validCredentials = await bcrypt.compare(req.query.password, user.password);
            //console.log(validCredentials)

            if (!validCredentials) {
                //If the credentials are not valid send Unauthorized status
                res.status(403).send(ErrorResponse(GetLanguage(req.query.language).notAuthorized))
            } else {
                //If the credentials are valid, send the JWT token encrypted with the important information about the user
                const token = jwt.sign(
                    {
                        name: user.name,
                        email: user.email,
                        address: user.address,
                        zipCode: user.zipCode,
                        userType: user.userType
                    },
                    JWTSECRET,
                    {
                        expiresIn: 86400 // 24H
                    })
                //console.log(token)

                res.status(200).send(SuccessResponse({
                    token: token
                }))
            }
        } else {
            //If the input fields are invalid
            res.status(400).send(ErrorResponse(inputValidation.message));
        }
    } catch (e) {
        console.error(e);
        res.status(500).send(ErrorResponse(e));
    }
}
module.exports = {
    CreateUser: CreateUser,
    GetUserLogin: GetUserLogin
}
