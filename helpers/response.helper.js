function formattedContent(status, message, payload) {
    const response = { status, message: message.toUpperCase() }
    if (payload) { response.payload = payload }
    return response
}

module.exports = { formattedContent }
