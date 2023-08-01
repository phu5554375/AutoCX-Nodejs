import express  from 'express'
import {
    studentController
    } from '../controllers/index.js'
const router = express.Router()

router.get('/', studentController.getAllStudents)
router.get('/:id', studentController.getStudentById)
router.patch('/', studentController.updateStudent)
router.patch('/', studentController.insertStudent)

export default router

