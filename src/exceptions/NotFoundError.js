const ClientError = require("./ClientError");

class NotFoundError extends ClientError{
    constructor(message){
        super(message, 401)
        this.name = 'NotFoundError'
    }
}

module.exports = NotFoundError