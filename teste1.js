const data =  require("./fakeData");
const { badRequest, notFound, ok } = require("./src/helpers/http/http-helpers");
const { UserNotFoundError } = require("./src/main/errors/user-not-found-error");
const { queryIsValid } = require("./src/main/validators/user-query-validator");

const getUser = ( req, res ) => {
    
    const {name} =  req.query;

    const error = queryIsValid(name);
    if (error) {
        return badRequest(error)
    }

    // search for user with current name
    // that way is more readble loop
    const user = data.find(user => user.name === name);
    //verify user has been found
    if(user) {
        user.access += 1;
        return ok({ name: user.name, job: user.job })
    }
    // return error with 404 Not Found error
    return notFound(new UserNotFoundError())

};

const getUsers = (req, res) => {
   return ok(data);
};

module.exports = {
    getUser,
    getUsers
};