import { 
    body, 
    validationResult
} from 'express-validator'
import {
    studentRepository,
    userRepository
} from '../repositories/index.js'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {EventEmitter} from 'node:events'
import Exception from '../exceptions/Exeption.js'
const myEvent = new EventEmitter()

myEvent.on('event.register.user', (params) => {
    console.log(`they talked about: ${JSON.stringify(params)}`)
})
const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ 
            errors: errors.array() 
        });
    }
    const { email, password } = req.body;
    // call repository

   try {
    let existingUser = await userRepository.login({email, password})
    res.status(HttpStatusCode.OK).json({
        message: "Login user successfully",
        data: existingUser
    })
   } catch (exception) {
    res.status(HttpStatusCode.INSERT_SERVER_ERROR).json({
        message: exception.toString(),
    })

   }
};
const register = async (req, res) => {
    const {
        name,
        email,
        phoneNumber,
        password,
        address,
    } = req.body
   
    myEvent.emit('event.register.user', {email:email, phoneNumber:phoneNumber})
    try {
        const user = await userRepository.register({ 
            name, 
            email, 
            password, 
            phoneNumber, 
            address 
        })
        res.status(HttpStatusCode.INSERT_OK).json({
            message: "Register user successfully",
            data: user
        })
    } catch (exception) {
        res.status(HttpStatusCode.INSERT_SERVER_ERROR).json({
            message: exception.toString(),
        })
    }
   
};

const getDetailUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    res.send("Post login user");
};
export default {
    login,
    register,
    getDetailUser,
};
