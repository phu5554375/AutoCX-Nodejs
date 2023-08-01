import e from "express";
import Exception from "../exceptions/Exeption.js";
import { print, OutputType } from "../helpers/print.js";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
const login = async ({ email, password }) => {
  // print('login user in user repostory', OutputType.INFORMATION)
  let existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    // not encrypt password
    let isMatch = await bcrypt.compare(password, existingUser.password);
    if (!!isMatch) {
      //create Java Web token
      let token = Jwt.sign(
        {
          data: existingUser,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "60", // 1 minute
        }
      );
      return {
        ...existingUser.toObject(),
        password: " not show",
        token: token,
      };
    } else {
      throw new Exception(Exception.WRONG_EMAIL_PASSWORD);
    }
  } else {
    throw new Exception(Exception.WRONG_EMAIL_PASSWORD);
  }
};
const register = async ({ name, email, password, phoneNumber, address }) => {
  try {
    const existingUser = await User.findOne({ email }).exec();
    if (!!existingUser) {
      throw new Exception(Exception.USER_EXIST);
    }
    // encrypt password
    //         const isMatched = await bcrypt.compare(password, existingUser.password)
    // if( !!isMatched){

    // }
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );
    //INSERT TO DB
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });
    return {
      ...newUser._doc,
      password: "Not show",
    };
  } catch (exception) {
    // check model valtication here
    throw new Exception(Exception.CANNOT_REGISTER_USER);
  }
  // print('register user width: name:'
  //    + name + 'email' + email + 'password:'
  //    + password + 'phone' + phoneNumber + 'address:' + address, OutputType.INFORMATION
  // )
};

export default {
  login,
  register,
};
