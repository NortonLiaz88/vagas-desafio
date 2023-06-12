const express = require('express');
const setupMiddlewares = require('./config/middlewares')
const usersRouter = require('./routes/users.routes');
const authenticationRouter = require('./routes/auth.routes');

const app = express();



setupMiddlewares(app)

app.get('/', function (req, res) {
  res.send(`get user/ </br>
  get users/ </br>
  post users/ </br>
  delete users/ </br>
  put users/ </br>
  `);
});


app.use(usersRouter)
app.use(authenticationRouter)


module.exports = app;
