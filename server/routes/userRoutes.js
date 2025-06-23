import express from 'express'
import {
  applyForRole,
  getUserData,
  getUserRoleApplications,
  updateUserResume,
  createUser, // ✅ added
} from '../controllers/userController.js'

import upload from '../config/multer.js'
import { requireAuth } from '../middleware/authMiddleware.js' // ✅ import

const router = express.Router()

router.use(requireAuth) // ✅ protect all routes below with Clerk JWT middleware

router.get('/user', getUserData)
router.post('/apply', applyForRole)
router.get('/applications', getUserRoleApplications)
router.post('/update-resume', upload.single('resume'), updateUserResume)

// ✅ Create user (called on first login)
router.post('/create', createUser)

export default router
