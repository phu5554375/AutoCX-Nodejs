import mongoose from "mongoose"
import {print, OutputType} from "../helpers/print.js"
import Exception from "../exceptions/Exeption.js"
mongoose.set('strictQuery', true)
async function connect() {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI)
    print('connect mongoose successfull', OutputType.SUCCESS)
    return connection;
  } catch (error) {
    const { code } = error;
    if (error.code == 8000) {
      throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
    } else if (code == "ENOTFOUND") {
      throw new Exception(Exception.WRONG_CONNECTION_STRING);
    }

    throw new Exception(Exception.CANNOT_CONNECT_MONGO);
  }
}
export default connect;
