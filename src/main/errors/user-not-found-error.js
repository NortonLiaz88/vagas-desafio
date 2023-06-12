class UserNotFoundError extends Error {
    constructor() {
        super('User Not Found');
        this.name = 'UserNotFoundError';
    }
}


module.exports = {
    UserNotFoundError
}