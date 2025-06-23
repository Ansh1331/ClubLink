// authMiddleware.js

import jwt from 'jsonwebtoken'
import Club from '../models/Club.js'
import { getAuth } from '@clerk/express'

// ✅ Protect club (recruiter) routes using custom JWT
export const protectClub = async (req, res, next) => {
  const token = req.headers.token

  if (!token) {
    return res.json({ success: false, message: 'Not authorized, Login Again' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.club = await Club.findById(decoded.id).select('-password')
    next()
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// ✅ Protect user (student/applicant) routes using Clerk
export const requireAuth = (req, res, next) => {
  const auth = getAuth(req)
  if (!auth || !auth.userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }
  req.auth = auth
  next()
}
