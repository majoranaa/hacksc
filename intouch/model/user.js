var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    username: String,
    password: String,
    email: [String],
    firstName: String,
    lastName: String,
    phone: [String],
    address: [String],
    major: String,
    school: String,
    year: String,
    resume: String
});
