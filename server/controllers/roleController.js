import Role from "../models/Role.js"



// Get All Roles
export const getRoles = async (req, res) => {
    try {

        const roles = await Role.find({ visible: true })
            .populate({ path: 'clubId', select: '-password' })

        res.json({ success: true, roles })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get Single Role Using RoleID
export const getRoleById = async (req, res) => {
    try {

        const { id } = req.params

        const role = await Role.findById(id)
            .populate({
                path: 'clubId',
                select: '-password'
            })

        if (!role) {
            return res.json({
                success: false,
                message: 'Role not found'
            })
        }

        res.json({
            success: true,
            role
        })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}