class UnauthorizedError extends Error {
  constructor () {
    super('Invalid Credentials');
    this.name = 'Unauthorized';
  }
}


module.exports = {
  UnauthorizedError
}
