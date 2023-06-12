const data =  require("./fakeData");
const { badRequest, notFound, noContent } = require("./src/helpers/http/http-helpers");
const { UserNotFoundError } = require("./src/main/errors/user-not-found-error");
const { queryIsValid } = require("./src/main/validators/user-query-validator");

const removeUser = (req, res) => {
    const { name } = req.query;
    let user = null;

    //verify name param has been provided
    const error = queryIsValid(name);
    if (error) {
        return badRequest(error)
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].name == name) {
            user = data[i];
            data.splice(i,1)
            //stop the cycle if the user has been deleted and adds performance
            break;
        }
    }

    //checks if user has been found and deleted
    if (!user) {
        return notFound(new UserNotFoundError())
    }

    return noContent();
}


module.exports = {
  removeUser
};