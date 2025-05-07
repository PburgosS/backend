class CustomError extends Error{
    constructor(code, msg){
        super(msg)
        this.code = code
        this.message = msg
    }
    getMessage(){
        return this.message;
    }
}

module.exports = CustomError;