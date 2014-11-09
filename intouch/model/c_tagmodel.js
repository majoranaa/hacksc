var mongoose = require('mongoose');

module.exports = mongoose.model('CompanyTag', {
    username: String,
    tagName: String,
    email: boolean,
    firstName: boolean, // representative name for companies
    lastName: boolean,
    phone: boolean,
    address: boolean,
    major: boolean,
    school: boolean,
    year: boolean,
    resume: boolean
});
