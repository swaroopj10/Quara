var express = require('express');
var router = express.Router();
var User = require('../models/User');
var flash = require('express-flash');
var ejs = require('ejs');
var path = require('path');

const app = express()
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname + '../views/css')));

router.get('/admin', function(req, res, next) {
    User.findOne({ unique_id: req.session.userId }, function(err, data) {

        if (!data) {
            res.redirect('/');
        } else {
            return res.render('admin.ejs', { "name": data.name, "email": data.email,"phone":data.phone, "doctor":data.doctor});
        }
    });
});

module.exports = router;