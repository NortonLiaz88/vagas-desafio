const { InvalidParamError } = require("../errors/invalid-param-error")

const queryIsValid = (query, message="Invalid query") => {
    if(!query) {
        return new InvalidParamError(message)
    }
    return null
}

module.exports = {
    queryIsValid
}