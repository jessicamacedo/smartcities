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
            email: Joi
            .string()
            .required()
            .email(),
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
            .valid("solarpanel")
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

async function JoiAssociateReadingDeviceValidation(params, body){
    try{
        var validationParams = Joi.object({
            language: Joi
            .string()
            .valid('pt','en')
        })
        await validationParams.validateAsync(params);
        var validationBody = Joi.object({
            deviceId: Joi
            .string()
            .required(),
            type: Joi
            .string()
            .required()
            .valid("solarpanel"),
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
     JoiAssociateReadingDeviceValidation: JoiAssociateReadingDeviceValidation,
     JoiAssociateGetReadingsDeviceValidation: JoiAssociateGetReadingsDeviceValidation
}