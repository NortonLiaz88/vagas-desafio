const { unauthorized, ok, serverError, forbidden, badRequest } = require("../../../helpers/http/http-helpers");
const { BCryptAdapter } = require("../../../infra/cryptography/bcrypt-adapter");
const { JwtAdapter } = require("../../../infra/cryptography/jwt-adapter");
const { AccountMemoryRepository } = require("../../../infra/repository/account/account-memory-repository");
const { authBodyIsValid } = require("../../validators/auth-validator");

const login = async (req, res) => {
  const salt = process.env.ENCRYPT_SALT;
  const jwtSecret = process.env.JWT_SECRET;

  const bcrypAdapter = new BCryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(jwtSecret);
  const accountMemoryRepository = new AccountMemoryRepository(bcrypAdapter);

  try {
    const { email, password } = req.body

    const bodyError = authBodyIsValid({ email, password });
    if (bodyError) {
      return badRequest(bodyError);
    }


    //load user from repository with class manager
    const account = await accountMemoryRepository.loadByEmail(
      email
    );


    if (account) {

      //compare the client password with storage password
      const isValid = await bcrypAdapter.compare(
        password,
        account?.password
      );

      if (isValid) {
        //create jwt token
        const accessToken = await jwtAdapter.encrypt(account?.id)
        if (!accessToken) {
          return unauthorized();
        }
        await accountMemoryRepository.updateAccessToken(account?.id, accessToken);
        return ok({ accessToken });
      }
    }

    return forbidden(new Error('The received email address is already in use '));

  } catch (error) {
    return serverError(error);
  }
}

module.exports = {
  login
}