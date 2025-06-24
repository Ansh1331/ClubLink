import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, required: true },
    date: { type: Number, required: true },
    visible: { type: Boolean, default: true },
    clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true }
})

const Role = mongoose.model('Role', roleSchema)

export default Role