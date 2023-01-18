/***
 *  Jéssica Macedo 
 *  Ultima alteração a 18/01/2023
 *  a6835@alunos.ipca.pt
 */

var { ErrorResponse, SuccessResponse } = require('../controllers/response');
const { UsersModel } = require("../models/users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const JWTSECRET = process.env.JWTSECRET;
const { GetLanguage } = require("../helpers/getLanguage")
const { JoiCreateUserValidation, JoiGetUserLoginValidation } = require("../validations/apiValidations")

/**
 * Função de criação de utilizador que encripta p
 * Params: req
 * Doxygen
 */
CreateUser = async function (req, res) {
    try {
        let validation = await JoiCreateUserValidation(req.query, req.body);
        console.log(validation)
        if (validation.isValid === true) {
            //console.log(req.body)
            const newUser = new UsersModel(req.body);
            const addUser = await newUser.save(req.body);

            if (addUser._id) {
                res.status(201).send(SuccessResponse(GetLanguage(req.query.language).createdUser));
            } else {
                // console.log(error)
                res.status(400).send(ErrorResponse(error));
            }
        } else {
            res.status(400).send(ErrorResponse(validation.message));
        }

    } catch (e) {
        // console.error(e);
        if (e.code === 11000) {
            // user already exists
            res.status(400).send(ErrorResponse(GetLanguage(req.query.language).duplicatedUser));
        } else {
            res.status(500).send(ErrorResponse(e));
        }
    }
}




GetUserLogin = async function (req, res) {
    try {
        let validation = await JoiGetUserLoginValidation(req.query);
        console.log(validation)
        if (validation.isValid === true) {
            console.log(req.query)
            const user = await UsersModel.findOne({ "email": req.query.email });
            console.log('user: ' + user)

            var validCredentials = await bcrypt.compare(req.query.password, user.password);
            console.log(validCredentials)
            if (!validCredentials) {
                res.status(403).send(ErrorResponse(GetLanguage(req.query.language).notAuthorized))
            } else {
                console.log('SECRET', JWTSECRET)
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
                console.log(token)

                res.status(200).send(SuccessResponse({
                    token: token
                }))
            }
        } else {
            res.status(400).send(ErrorResponse(validation.message));
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
