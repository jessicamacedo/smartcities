const Joi = require('joi');

async function JoiCreateUserValidation(params, body){
    try{
        var validationParams = Joi.object({
            language: Joi
            .string()
            .valid('pt','en')
        })
        await validationParams.validateAsync(params);
        var validationBody = Joi.object({
            name: Joi
            .string()
            .regex(/^[a-zA-Z0-9 ]*$/)
            .required(),
            email: Joi
            .string()
            .required()
            .email(),
            password: Joi
            .string()
            .required()
            .min(8),
            passwordRepeated: Joi
            .string()
            .required()
            .min(8),
            address: Joi
            .string()
            .required(),
            zipCode: Joi
            .string()
            .regex(/^[0-9_/-]*$/)
            .required(),
            userType: Joi
            .string()
            .valid("domestic", "manager", "admin")
            .required()
        })
        await validationBody.validateAsync(body);
        return {
            isValid: true
        };
    }catch(e){
        console.log()
        return {
            isValid: false,
            message: e
        };
    }
}

async function JoiGetUserLoginValidation(params){
    try{
        var validation = Joi.object({
            email: Joi
            .string()
            .required()
            .email(),
            password: Joi
            .string()
            .required() 
            .min(8)
        })
        await validation.validateAsync(params);
        return {
            isValid: true
        };
    }catch(e){
        console.log()
        return {
            isValid: false,
            message: e
        };
    }
}

async function JoiAssociateDeviceValidation(params, body){
    try{
        var validationParams = Joi.object({
            language: Joi
            .string()
            .valid('pt','en')
        })
        await validationParams.validateAsync(params);
        var validationBody = Joi.object({
            deviceName: Joi
            .string()
            .required(),
            deviceId: Joi
            .string()
            .required(),
            location: Joi
            .string()
            .required(),
            type: Joi
            .string()
            .valid("solarpanel", "windpower", "hydropower", "energystorage")
            .required()
        })
        await validationBody.validateAsync(body);
        return {
            isValid: true
        };
    }catch(e){
        console.log()
        return {
            isValid: false,
            message: e
        };
    }
}

async function JoiCreateReadingDeviceValidation(params, body){
    try{
        var validationParams = Joi.object({
            language: Joi
            .string()
            .regex(/^[a-zA-Z0-9]*$/)
            .valid('pt','en')
        })
        await validationParams.validateAsync(params);
        var validationBody = Joi.object({
            deviceId: Joi
            .string()
            .regex(/^[a-zA-Z0-9-]*$/)
            .required(),
            type: Joi
            .string()
            .required()
            .valid("solarpanel", "windpower", "hydropower", "energystorage"),
            consumption: Joi
            .number()
            .required(),
            production: Joi
            .number()
            .required()
        })
        await validationBody.validateAsync(body);
        return {
            isValid: true
        };
    }catch(e){
        console.log()
        return {
            isValid: false,
            message: e
        };
    }
}

async function JoiAssociateGetReadingsDeviceValidation(params){
    try{
        var validationParams = Joi.object({
            language: Joi
            .string()
            .valid('pt','en'),
            deviceId: Joi
            .string()
            .regex(/^[a-zA-Z0-9-]*$/) //usado para prevenir NOSQL injection in mongo ex: consumption: { $gte: 10 }
            .required(),
        })
        await validationParams.validateAsync(params);

        return {
            isValid: true
        };
    }catch(e){
        console.log()
        return {
            isValid: false,
            message: e
        };
    }
}


module.exports = {
     JoiCreateUserValidation: JoiCreateUserValidation,
     JoiGetUserLoginValidation: JoiGetUserLoginValidation,
     JoiAssociateDeviceValidation: JoiAssociateDeviceValidation,
     JoiCreateReadingDeviceValidation: JoiCreateReadingDeviceValidation,
     JoiAssociateGetReadingsDeviceValidation: JoiAssociateGetReadingsDeviceValidation
}