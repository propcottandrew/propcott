var passport  = require('passport');
var validator = require('validator');
var bcrypt    = require('bcryptjs');
var dynamo    = require(app.aws).dynamo;
var User      = require(app.models.user);

module.exports.form = (req, res) => res.render('auth/login.html');

module.exports.login = (req, res) => {
	User.find('local', req.body.email, (err, user) => {
		if(err || !user.authenticate(req.body.password)) {
			req.flash('Invalid username or password');
			res.render('auth/login.html');
		} else user.load((err, user) => {
			if(err) {
				req.flash('Could not load user');
				return res.render('auth/login.html');
			}
			
			req.session.user = user.session();
			req.flash('Successfully logged in');
			user.emit('login', err => {
				// make sure err isn't that they have a draft
				res.redirect('/');
			});
		});
	});
};

module.exports.register = function(req, res) {
	if(!(validator.isEmail(req.body.email)
		&& req.body.password.length
		&& req.body.password == req.body.password_confirmation
		&& req.body.name)) {
		req.flash(MessageBag, 'input.incorrect');
		return res.redirect('/login');
	}

	var user = new User();
	user.link('local', req.body.email, req.body.password);

	delete req.body.password;
	delete req.body.password_confirmation;
	delete req.body['g-recaptcha-response'];
	delete req.body.register;

	for(var i in req.body) user[i] = req.body[i];
	user.displayName = req.body.name.split(' ')[0];
	user.save(function(err, user) {
		if(err) {
			req.flash(MessageBag, 'auth.registered.error');
			return res.redirect('/login');
		}
		req.session.user = user.session();
		req.flash(MessageBag, 'auth.registered');
		user.emit('register');
		user.emit('login');
		res.redirect('/');
	});
};

module.exports.logout = function(req, res) {
	var user = new User(req.session.user);
	req.session.destroy(err => {
		if(err) {
			req.flash('Could not log out');
			return res.redirect('/');
		}
		res.clearCookie('sid');
		user.emit('logout');
		res.redirect('/');
	});
};