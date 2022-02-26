const mongoose = require("mongoose");

// name, phone, email, gender, dob, profile_photo, register date

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    profile_photo: { type: String, required: true },
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model("user", userSchema);