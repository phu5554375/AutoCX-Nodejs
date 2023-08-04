import { print, OutputType } from "../helpers/print.js"
export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = "Wrong database username and password"
    static WRONG_CONNECTION_STRING = "Wrong server name/ connection string"
    static CANNOT_CONNECT_MONGO = "cant not connect to Mongoose"
    static USER_EXIST  = "User already exists"
    static CANNOT_REGISTER_USER = " Cannot register user"
    static WRONG_EMAIL_PASSWORD ="Wrong email of password"


    constructor(message, validateErrors={}) {
        super(`message${Object.keys(validateErrors).lenght > 0 ? 
            JSON.stringify(validateErrors): ''}`) //call constuctor of parent class(Error)
        print(message, OutputType.ERROR)
    }
}