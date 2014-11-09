var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    username: String,
    password: String,
    email: [String],
    firstName: String, // representative name for companies
    lastName: String,
    phone: [String],
    address: [String],
    is_comp: Boolean,
    //major: String,
    //school: String,
    //year: String,
    //resume: String
});
