const data = require('./fakeData');
const { badRequest, ok, notFound } = require('./src/helpers/http/http-helpers');
const { UserNotFoundError } = require('./src/main/errors/user-not-found-error');
const { queryIsValid } = require('./src/main/validators/user-query-validator');


const getAccess = (req, res) => {
    const { name } = req.query;

    const error = queryIsValid(name);
    if (error) {
        return badRequest(error)
    }

    // search for user with current name
    const { name: userName, access } = data.find(user => user.name === name);
    //verify user has been found
    if (userName) {
        return ok({ message: `Usuário ${userName}  foi lido ${access} vezes.`, access })
    }
    // return error with 404 Not Found error
    return notFound(new UserNotFoundError());
}

module.exports = {
    getAccess
}