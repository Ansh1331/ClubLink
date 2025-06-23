import mongoose from "mongoose";

const RoleApplicationSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true },
    clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    status: { type: String, default: 'Pending' },
    date: { type: Number, required: true }
})

const RoleApplication = mongoose.model('RoleApplication', RoleApplicationSchema)

export default RoleApplication