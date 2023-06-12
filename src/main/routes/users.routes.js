const express = require('express');
const usersRoutes = express.Router();

const { adapRoute } = require('../adapters/express-routes-adapter');
const { auth } = require('../middlewares/auth');

const teste1 = require("../../../teste1");
const teste2 = require("../../../teste2");
const teste3 = require("../../../teste3");
const teste4 = require("../../../teste4");
const teste5 = require("../../../teste5");


usersRoutes.get("/user", adapRoute(teste1.getUser));
usersRoutes.get("/users", adapRoute(teste1.getUsers));
usersRoutes.post("/users", auth, adapRoute(teste2.createUser))
usersRoutes.delete("/users", auth, adapRoute(teste3.removeUser))
usersRoutes.put("/users", auth, adapRoute(teste4.updateUser))
usersRoutes.get("/users/access", adapRoute(teste5.getAccess));


module.exports = usersRoutes;

