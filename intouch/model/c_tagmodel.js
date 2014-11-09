var mongoose = require('mongoose');

module.exports = mongoose.model('CompanyTag', {
    username: String,
    tagName: String,
    email: Boolean,
    firstName: Boolean, // representative name for companies
    lastName: Boolean,
    phone: Boolean,
    address: Boolean,
    major: Boolean,
    school: Boolean,
    year: Boolean,
    resume: Boolean
});
