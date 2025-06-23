import express from 'express'
import { getRoleById, getRoles } from '../controllers/roleController.js';

const router = express.Router()

// Route to get all roles data
router.get('/', getRoles)

// Route to get a single role by ID
router.get('/:id', getRoleById)


export default router;