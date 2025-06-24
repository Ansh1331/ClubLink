import Club from "../models/Club.js";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import generateToken from "../utils/generateToken.js";
import Role from "../models/Role.js";
import RoleApplication from "../models/RoleApplication.js";

// Register a new club
export const registerClub = async (req, res) => {

    const { name, email, password } = req.body

    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return res.json({ success: false, message: "Missing Details" })
    }

    try {

        const clubExists = await Club.findOne({ email })

        if (clubExists) {
            return res.json({ success: false, message: 'Club already registered' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const club = await Club.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })

        res.json({
            success: true,
            club: {
                _id: club._id,
                name: club.name,
                email: club.email,
                image: club.image
            },
            token: generateToken(club._id)
        })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Login Club
export const loginClub = async (req, res) => {

    const { email, password } = req.body

    try {

        const club = await Club.findOne({ email })

        if (await bcrypt.compare(password, club.password)) {

            res.json({
                success: true,
                club: {
                    _id: club._id,
                    name: club.name,
                    email: club.email,
                    image: club.image
                },
                token: generateToken(club._id)
            })

        }
        else {
            res.json({ success: false, message: 'Invalid email or password' })
        }

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Get Club Data
export const getClubData = async (req, res) => {

    try {

        const club = req.club

        res.json({ success: true, club })

    } catch (error) {
        res.json({
            success: false, message: error.message
        })
    }

}

// Post New Role
export const postRole = async (req, res) => {

    const { title, description, location, level, category } = req.body

    const clubId = req.club._id

    try {

        const newRole = new Role({
            title,
            description,
            location,
            clubId,
            date: Date.now(),
            level,
            category
        })

        await newRole.save()

        res.json({ success: true, newRole })

    } catch (error) {

        res.json({ success: false, message: error.message })

    }


}

// Get Club Role Applicants
export const getClubRoleApplicants = async (req, res) => {
    try {

        const clubId = req.club._id

        // Find role applications for the user and populate related data
        const applications = await RoleApplication.find({ clubId })
            .populate('userId', 'name image resume')
            .exec()

        return res.json({ success: true, applications })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get Club Posted Roles
export const getClubPostedRoles = async (req, res) => {
    try {

        const clubId = req.club._id

        const roles = await Role.find({ clubId })

        // Adding No. of applicants info in data
        const rolesData = await Promise.all(roles.map(async (role) => {
            const applicants = await RoleApplication.find({ roleId: role._id });
            return { ...role.toObject(), applicants: applicants.length }
        }))

        res.json({ success: true, rolesData })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Change Role Application Status
export const ChangeRoleApplicationsStatus = async (req, res) => {

    try {

        const { id, status } = req.body

        // Find Role application and update status
        await RoleApplication.findOneAndUpdate({ _id: id }, { status })

        res.json({ success: true, message: 'Status Changed' })

    } catch (error) {

        res.json({ success: false, message: error.message })

    }
}

// Change Role Visiblity
export const changeVisiblity = async (req, res) => {
    try {

        const { id } = req.body

        const clubId = req.club._id

        const role = await Role.findById(id)

        if (clubId.toString() === role.clubId.toString()) {
            role.visible = !role.visible
        }

        await role.save()

        res.json({ success: true, role })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}