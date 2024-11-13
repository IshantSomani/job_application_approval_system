const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        // match: [/^\d{10}$/, 'Please fill a valid phone number'] 
    },
    cvUrl: { type: String, required: true },
    status: { type: String, default: 'pending' },
});

const JobApplication = mongoose.model('JobApplication', JobApplicationSchema);
module.exports = JobApplication;