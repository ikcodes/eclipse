var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var pageTitle = 'Music';

	// Set locals
	locals.section = 'music';
	locals.pageTitle = pageTitle;

	// SEO
	var SEO = keystone.list('SEO').model.find();
	view.query('SEO', SEO);
	
	// Pull data, assign name for view, render view file.
	var payload = keystone.list('Music').model.find().sort('sortOrder');
	view.query('music', payload);
	view.render('music');
};
