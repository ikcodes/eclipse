var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var PageTitle = 'Terms & Conditions';
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'terms';
	locals.pageTitle = PageTitle;
	
	// SEO
	var SEO = keystone.list('SEO').model.find();
	view.query('SEO', SEO);
	
	// 'About Us' text
	var TextBlock = keystone.list('TermsOfService').model.find();
	view.query('TermsOfService', TextBlock);
	
	// Query data, assign to view variable, render view file.
	var payload = keystone.list('TermsOfService').model.find();
	view.query('content', payload);
	view.render('terms');
};
