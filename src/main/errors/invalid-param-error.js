class InvalidParamError extends Error {
    constructor(paramName) {
        super(`Invalid param: ${paramName}`);
        this.name = paramName;
    }
}

module.exports = {
    InvalidParamError
}