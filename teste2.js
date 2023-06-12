const { v4: uuidv4 } = require('uuid');
const data =  require("./fakeData");
const { bodyIsValid } = require('./src/main/validators/user-body-validator');
const { badRequest, conflict, ok } = require('./src/helpers/http/http-helpers');

const createUser = (req, res) => {
    const { name, job } = req.body;

    const error = bodyIsValid({name, job});
    //   validates if name and position exist
    if(error) {
        return badRequest(error)
    }

    const userAlreadyExists = data.find(user => user.name === name);

    // check if user already exists with body name
    if(userAlreadyExists) {
        return conflict(new Error('User already exists'))
    }

    const id = uuidv4();
    const newUser = {id, name, job, views: 0};

    data.push(newUser)
    return ok(newUser);
}


module.exports = {
    createUser
}