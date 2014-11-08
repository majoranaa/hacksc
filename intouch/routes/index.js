var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/accounts', function(req, res) {
    res.render('accounts', { title: 'Accounts' });
});

module.exports = router;
