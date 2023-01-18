function ErrorResponse(error) {
    return {
        "error": error.toString()
    }
}

function SuccessResponse(message) {
    return {
        "success": message
    }
}

module.exports = {
    ErrorResponse: ErrorResponse,
    SuccessResponse: SuccessResponse
}

