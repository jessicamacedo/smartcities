/***
 *  Jéssica Macedo 
 *  Last modified 21/01/2023
 */

var { ErrorResponse, SuccessResponse } = require('./response');
const { GetLanguage } = require("../helpers/getLanguage")
const { JoiAssociateReadingDeviceValidation, JoiAssociateGetReadingsDeviceValidation } = require("../validations/apiValidations");
const { ReadingsModel } = require("../models/readings");


/**
 * Function to insert the reading of a device
 */
CreateReadingDevice = async function (req, res) {
    try {
        //Validate input parameters and body from api
        let inputValidation = await JoiAssociateReadingDeviceValidation(req.query, req.body);
        console.log(inputValidation)

        if (inputValidation.isValid === true) {
            req.body.createdDate = new Date();
            console.log(req.body)
            const newReading = new ReadingsModel(req.body);
            await newReading.save(req.body)
            .then(result => {
                console.log(result)
                //If the document is inserted it returns a success response with dynamic translation
                res.status(201).send(SuccessResponse(GetLanguage(req.query.language).createdReading));
            })
            .catch(err => {
                //Returns the database error saving reading
                res.status(500).send(ErrorResponse(err));
            })
        } else {
            //If the input fields are invalid
            res.status(400).send(ErrorResponse(inputValidation.message));
        }
    } catch (e) {
        console.error(e);
        res.status(500).send(ErrorResponse(e));
    }
}

/**
 * Function to get the readings of a device
 */
GetReadingsDevice = async function (req, res) {
    try {
        //Validate input parameters and body from api
        let inputValidation = await JoiAssociateGetReadingsDeviceValidation(req.query);
        console.log(inputValidation)

        if (inputValidation.isValid === true) {

            console.log(req.query)
            console.log({ "deviceId": req.query.deviceId })
            const readings = await ReadingsModel.find({ "deviceId": req.query.deviceId }).sort({createdDate: -1});
            console.log(readings)
            res.status(200).send(readings)

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
    CreateReadingDevice: CreateReadingDevice,
    GetReadingsDevice: GetReadingsDevice
}
