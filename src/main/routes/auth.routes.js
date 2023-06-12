const express = require('express');
const authenticationRouter = express.Router();

const { adapRoute } = require('../adapters/express-routes-adapter');

const login = require('../factories/authentication/login-storage-factory');
const authentication = require('../factories/authentication/sign-up-storage-factory');

authenticationRouter.post("/signup", adapRoute(authentication.signUp));
authenticationRouter.post("/login", adapRoute(login.login));


module.exports = authenticationRouter;

