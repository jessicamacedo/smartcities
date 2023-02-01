function errorResponse(error) {
    return {
        "error": error.toString()
    }
}

function successResponse(message) {
    return {
        "success": message
    }
}



module.exports = {
    errorResponse: errorResponse,
    successResponse: successResponse
}

