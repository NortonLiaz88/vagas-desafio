const data =  require("./fakeData");
const { badRequest, notFound, ok } = require("./src/helpers/http/http-helpers");
const { UserNotFoundError } = require("./src/main/errors/user-not-found-error");
const { bodyIsValid } = require("./src/main/validators/user-body-validator");
const { queryIsValid } = require("./src/main/validators/user-query-validator");


const updateUser = (req, res) => {
    const { id } = req.query;
    const { name, job } = req.body;
    
    const error = queryIsValid(id);
    if (error) {
        return badRequest(error);
    }
    const bodyError = bodyIsValid({name, job});

    if(bodyError) {
        return bodyError;
    }

    let user = data.find(user => user.id === id);

    if(!user) {
        return notFound(new UserNotFoundError())
    }

    user = Object.assign(user, { name, job });
    return ok(user);
}

module.exports = {
    updateUser
}