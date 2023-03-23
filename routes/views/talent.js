var keystone = require('keystone');

// This works hand-in-hand with talent_single
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var pageTitle = 'Talent';
	locals.pageTitle = pageTitle;

	// SEO
	var SEO = keystone.list('SEO').model.find();
	view.query('SEO', SEO);
	
	// Set locals
	locals.section = 'talent';

	// Pull data, assign name for view, render view file.
	var payload = keystone.list('Talent').model.find().sort({ "sortOrder": 1, "name.last": 1})
	// var payload = keystone.list('Talent').model.find().sort('sortOrder');
	view.query('talent', payload);
	view.render('talent');
};
