const { serverError, forbidden, ok } = require("../../helpers/http/http-helpers");
const {AccessDeniedError} = require('../errors/access-denied-error');

class AuthMiddleware  {
  constructor (loadAccountByToken, role) {
    this.loadAccountByToken = loadAccountByToken;
    this.role = role ? role : '';
  }

  async handle (httpRequest) {
    try {
      const accessToken = httpRequest.headers?.['x-access-token'];

      if (accessToken) {
        const account = await this.loadAccountByToken.loadByToken(accessToken, this.role);
        if (account) {
          return ok({ accountId: account.id });
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (error) {
      return serverError(error);
    }
  }
}

module.exports = {
  AuthMiddleware
}
