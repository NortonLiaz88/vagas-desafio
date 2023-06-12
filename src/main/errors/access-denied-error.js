class AccessDeniedError extends Error {
  constructor () {
    super('Access Denied');
    this.name = 'AccessDeniedError';
  }
}


module.exports = {
  AccessDeniedError
}