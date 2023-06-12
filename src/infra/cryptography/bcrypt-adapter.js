const bcrypt = require('bcrypt');

class BCryptAdapter  {
  constructor (salt) {
    this.salt = salt;
  }

  async hash (value) {
    const hash = await bcrypt.hash(value, this.salt);
    return await new Promise(resolve => resolve(hash));
  }

  async compare (value, hash) {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }
}


module.exports = {
  BCryptAdapter
}
