import Exception from "../exceptions/Exeption.js";

const getAllStudents = async ({ page, size, searchString }) => {
  console.log("get all student width pagig");
};
const insertStudent = async ({
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address,
}) => {
  try {
    const student = await Student.create({
      name,
      email,
      languages,
      gender,
      phoneNumber,
      address,
    });
  } catch (exception) {
    if (!!exception.errors) {
      throw new Exception(" Input error", exception.errors);
    }
  }
};

export default {
  getAllStudents,
  insertStudent,
};
