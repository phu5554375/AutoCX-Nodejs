import {Schema, ObjectId} from "mongoose"
import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const Student = mongoose.model('Student', 
        new Schema({
            id: { type: ObjectId},
            name: {
                type: String,
                required: true,
                validate: {
                    validator: (value) => value.length > 3,
                    message: "Username must be ai least 3 charaters"
                }
            },
            email: {
                type: String,
                validate: {
                    validator:  isEmail,
                    message: "Email í incorrect format"
                }

            },
            languages: {
                type: [String],

            },
            gender: {
                type: String,
                enum:{
                    values: ['Male', 'Female'],
                    message: '{VALUE} is not supported'
                },
                required: true

            },
            phoneNumber: {
                type: String,
                required: true,
                validate : ( phoneNumber) => phoneNumber.length > 5,
                message: "Phone number must be at least 5 charaters"

            },
            address: {
                type: String,
                required: false,
            },
        })
)
export default Student