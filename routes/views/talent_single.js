var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var pageTitle = 'Talent';

	// SEO
	var SEO = keystone.list('SEO').model.find();
	view.query('SEO', SEO);
	
	// Set locals
	locals.section = 'talent_single';
	locals.pageTitle = pageTitle;
	locals.filters = {
		talent: req.params.talent,
	};
	locals.data = {
		talents: [],
	};

	// Load the current talent
	view.on('init', function (next) {
		var q = keystone.list('Talent').model.findOne({
			slug: locals.filters.talent
		});
		// }).populate('author categories');	// I don't know what this does!!
		q.exec(function (err, result) {
			locals.data.talent = result;
			next(err);
		});
	});

	// Load other talents (why?)
	// view.on('init', function (next) {
	// 	var q = keystone.list('Talent').model.find();
	// 	q.exec(function (err, results) {
	// 		locals.data.talents = results;
	// 		next(err);
	// 	});

	// Render the view
	view.render('talent_single');
};
