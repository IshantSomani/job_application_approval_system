const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['initiator', 'reviewer', 'approver'], required: true },
});

module.exports = mongoose.model("User", userSchema);