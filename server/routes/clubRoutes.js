import express from 'express'
import { ChangeRoleApplicationsStatus, changeVisiblity, getClubData, getClubRoleApplicants, getClubPostedRoles, loginClub, postRole, registerClub } from '../controllers/clubController.js'
import upload from '../config/multer.js'
import { protectClub } from '../middleware/authMiddleware.js'

const router = express.Router()

// Register a club
router.post('/register', upload.single('image'), registerClub)

// Club login
router.post('/login', loginClub)

// Get club data
router.get('/club', protectClub, getClubData)

// Post a role
router.post('/post-role', protectClub, postRole)

// Get Applicants Data of Club
router.get('/applicants', protectClub, getClubRoleApplicants)

// Get  Club Role List
router.get('/list-roles', protectClub, getClubPostedRoles)

// Change Applcations Status 
router.post('/change-status', protectClub, ChangeRoleApplicationsStatus)

// Change Applcations Visiblity 
router.post('/change-visiblity', protectClub, changeVisiblity)

export default router