const usersCtrl = {};

const passport = require('passport');
const User = require('../models/User')

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async(req, res) => {
    const errors = [];
    const {name, email, password, confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({text: 'Passwords do not match'});
    }
    if(password.length < 4){
        errors.push({text: 'Passwords do not match'});
    }
    if(errors.length != 0){
        res.render('users/signup', {errors, name, email});
    }else {
        const emailUsers = await User.findOne({email});
        if(emailUsers){
            req.flash('error_msg', 'The e-mail is already in use.');
            res.redirect('/users/signup');
        } else{
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered');
            res.redirect('/users/login');
        }
    }
};

usersCtrl.renderLoginForm = (req, res) => {
    res.render('users/login');
};

// usersCtrl.login = (req, res) => {
//     res.send('login');
// };

usersCtrl.login = passport.authenticate('local', {
    failureRedirect: '/users/login',
    successRedirect: '/notes',
    failureFlash: true
})

usersCtrl.logout = (req, res) => {
    //res.send('logout');
    req.logout();
    req.flash('success_msg', 'You are logged out now');
    res.redirect('/users/login');
};

module.exports = usersCtrl; 