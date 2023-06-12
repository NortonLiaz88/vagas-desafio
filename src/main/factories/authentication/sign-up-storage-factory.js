const { ok, forbidden, serverError, badRequest } = require("../../../helpers/http/http-helpers");
const { BCryptAdapter } = require("../../../infra/cryptography/bcrypt-adapter");
const { JwtAdapter } = require("../../../infra/cryptography/jwt-adapter");
const { AccountMemoryRepository } = require("../../../infra/repository/account/account-memory-repository");
const { authBodyIsValid } = require("../../validators/auth-validator");


const signUp = async (req, res) => {

    const salt = parseInt(process.env.ENCRYPT_SALT);
    const jwtSecret = process.env.JWT_SECRET;
    const bcrypAdapter = new BCryptAdapter(salt);
    const jwtAdapter = new JwtAdapter(jwtSecret);
    const accountMemoryRepository = new AccountMemoryRepository(bcrypAdapter);

    try {
        const { email, password } = req.body;
        const bodyError = authBodyIsValid({email, password});
        if (bodyError) {
            return badRequest(bodyError);
        }

        const account = await accountMemoryRepository.loadByEmail(
            email
        );
        if (!account) {
            const newAccount = await accountMemoryRepository.add({ email, password });
            const accessToken = await jwtAdapter.encrypt(newAccount?.id);
            await accountMemoryRepository.updateAccessToken(newAccount?.id, accessToken);
            return ok(accessToken);
        }
        return forbidden(new Error('The received email address is already in use '));
    } catch (error) {
        console.log(error);
        return serverError(error);
    }
}

module.exports = {
    signUp
}
