const { v4: uuidv4 } = require('uuid');
const usersStorage = require('./account');


// this class is responsible for managing our users
class AccountMemoryRepository {
    constructor(hasher) {
        this.hasher = hasher;
    }

    // method to create user {email, password}
    async add (account) {
        const password = await this.hasher.hash(account.password);
        const newUser = Object.assign(account, { id: uuidv4(), password })
        usersStorage.push(newUser);
    }

    // method to load user by email
    async loadByEmail (email) {
        const user = usersStorage.find(user => user.email === email);
        return user;
    }

    // method to load user by token
    async loadByToken(token, role) {
        const user = usersStorage.find(user => user.token === token);
        return user;
    }

    async updateAccessToken(id,  token) {
        
        //starts the user as null to validate in controller
        let account = null;

        for (let i = 0; i < usersStorage.length; i++) {
            if (usersStorage[i].id === id) {
                usersStorage[i].token = token;
                account = usersStorage[i];
                //stop the cycle if the user has been deleted and adds performance
                break;
            }
        }
        return account;

    }
}

module.exports ={
    AccountMemoryRepository
}