const { MissingParamError } = require("../errors/missing-param-error")

const bodyIsValid = ({name, job}) => {
    if(!name) {
        return new MissingParamError('User name is invalid');
    }
    if(!job) {
        return new MissingParamError('User job is invalid');
    }
    return null;
}

module.exports = {
    bodyIsValid
}