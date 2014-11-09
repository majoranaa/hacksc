var mongoose = require('mongoose');

module.exports = mongoose.model('UserTag', {
    username: String,
    tagName: String,
    email: [String],
    firstName: String, // representative name for companies
    lastName: String,
    phone: [String],
    address: [String],
    major: String,
    school: String,
    year: String,
    resume: String
});
