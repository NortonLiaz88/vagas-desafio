const jwt = require('jsonwebtoken');

class JwtAdapter {
  constructor (secret) {
    this.secret = secret;
  }

  async encrypt (value) {
    const accessToken = await jwt.sign({ id: value }, this.secret);
    return accessToken;
  }

  async decrypt (value) {
    const accessToken = await jwt.verify(value, this.secret);
    return accessToken;
  }
}

module.exports = {
  JwtAdapter
}
