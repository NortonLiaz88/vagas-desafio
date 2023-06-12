const { MissingParamError } = require("../errors/missing-param-error")

const authBodyIsValid = ({ email, password }) => {
    if (!email) {
        return new MissingParamError('Email is invalid');
    }
    if (!password) {
        return new MissingParamError('Password is invalid');
    }
    return null;
}

module.exports = {
    authBodyIsValid
}