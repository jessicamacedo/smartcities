/***
 *  Jéssica Macedo 
 *  Last modified 21/01/2023
 */


/**
 * Generic function to return a error object response to all apis
 * @param {*} error Error message received from some broked function 
 * @returns Object with field "error" corresponding to the error message received on format string
 */
function ErrorResponse(error) {
    return {
        "error": error.toString()
    }
}

/**
 * Generic function to return a success object response to all apis
 * @param {*} message Success message received from some successfull function 
 * @returns Object with field "success" corresponding to the success message received
 */
function SuccessResponse(message) {
    return {
        "success": message
    }
}

module.exports = {
    ErrorResponse: ErrorResponse,
    SuccessResponse: SuccessResponse
}

