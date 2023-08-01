import { message } from 'antd'
import { body, validationResult} from 'express-validator'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import { studentRepository } from '../repositories/index.js'
async function getAllStudents(req, res) {
    res.status(HttpStatusCode.OK).json ({
        message: 'Get students successfully',
        data: [ 
            {
                name:' phule ngoc',
                email: 'pd00829@gmail.com',
                age:28
            },
            {
                name:' le phu',
                email: '12333@gmail.com',
                age:38
            },
            {
                name:' ngoc phu',
                email: 'phule@gmail.com',
                age:18
            },

        ]
    }
)}

async function getStudentById(req, res) {
    
}
async function updateStudent(req, res) {
    
}
async function insertStudent(req, res) {
    try {
        const student = await studentRepository.insertStudent(req.body)
        res.status(HttpStatusCode.INSERT_OK).json({
            message:"Insert Student success",
            data: student
        })
    } catch (exception) {
        res.status(HttpStatusCode.INSERT_SERVER_ERROR).json({
            message: "Cannot insert student:"+error
        })
    }
    
}
export default {
    getAllStudents,
    getStudentById,
    updateStudent,
    insertStudent
}