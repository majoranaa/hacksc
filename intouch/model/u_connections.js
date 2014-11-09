var mongoose = require('mongoose');

module.exports = mongoose.model('UserConnection', {
	m_username: String,
    tagName: [String],
    username: String,
    email: [String],
    firstName: String, // representative name for companies
    lastName: String,
    phone: [String],
    address: [String]
});
