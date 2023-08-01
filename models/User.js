import mongoose , {Schema, ObjectId} from "mongoose";
import isEmail from "validator/lib/isEmail.js";
export default mongoose.model('User',
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
                    validator: (value) => isEmail,
                    message: "Email í incorrect format"
                }

            },
            password: {
                type: String,
                required: true,

            },
            phoneNumber: {
                type: String,
                required: true,

            },
            address: {
                type: String,
                required: false,

            },
        })
)