const { BCryptAdapter } = require('../../infra/cryptography/bcrypt-adapter');
const { AccountMemoryRepository } = require('../../infra/repository/account/account-memory-repository');
const { adaptMiddleware } = require('../adapters/express-middleware-adapter');
const {AuthMiddleware} = require('./auth-middleware');

const salt = process.env.ENCRYPT_SALT;
const bcrypAdapter = new BCryptAdapter(salt);
const accountMemoryRepository = new AccountMemoryRepository(bcrypAdapter);
const auth = adaptMiddleware(new AuthMiddleware(accountMemoryRepository));

module.exports = {
    auth
}