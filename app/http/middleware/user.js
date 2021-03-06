module.exports = (req, res, next) => {
	// Continue if logged in
	if(req.session.user) return next();
	
	req.flash(['info', 'You must log in first.']);
	res.redirect('/login');
};
