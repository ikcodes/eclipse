var keystone = require('keystone');
var async = require('async');


exports = module.exports = function (req, res) {
	// locals.section is used to set the currently selected item in the header navigation.
	var locals = res.locals;
	locals.section = 'home';
	var view = new keystone.View(req, res);
	
	// This is set w/ locals below
	var pageTitle = 'Home';
	
	// Content (this... is dead.)
	var payload_content = keystone.list('HomepageSlider').model.find().sort('sortOrder');
	view.query('slider_images', payload_content);
	
	// Talent
	var payload_talent = keystone.list('Talent').model.find().sort({ "sortOrder": 1, "name.last": 1});
	view.query('talent', payload_talent);
	
	// Music
	var payload_music = keystone.list('Music').model.find().sort('sortOrder');
	view.query('music', payload_music);
	
	// Team
	var payload_team = keystone.list('TeamMember').model.find().sort('sortOrder');
	view.query('team', payload_team);
	
	// SEO
	var SEO = keystone.list('SEO').model.find();
	view.query('SEO', SEO);
	
	// 'About Us' text
	var TextBlock = keystone.list('AboutUsText').model.find();
	view.query('AboutUsText', TextBlock);
	
	/*=============>  NEWS STUFF  <==============//
		As usual, this stuff is pretty complicated.
		There are categories and pagination to deal
			with on the main page, and hopefully some
			of that can be stripped out here.
	//======================================*/
	
	locals.filters = {
		category: req.params.category,
	};
	locals.data = {
		posts: [],
		categories: [],
	};
	locals.pageTitle = pageTitle;
		
	// Load all categories
	// view.on('init', function (next) {
	// 	keystone.list('PostCategory').model.find().sort('name').exec(function (err, results) {
	// 		if (err || !results.length) {
	// 			return next(err);
	// 		}
	// 		locals.data.categories = results;
	// 		// Load the counts for each category
	// 		async.each(locals.data.categories, function (category, next) {
	// 			keystone.list('Post').model.count().where('categories').in([category.id]).exec(function (err, count) {
	// 				category.postCount = count;
	// 				next(err);
	// 			});
	// 		}, function (err) {
	// 			next(err);
	// 		});
	// 	});
	// });
	// Load the current category filter
	// view.on('init', function (next) {
	// 	if (req.params.category) {
	// 		keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function (err, result) {
	// 			locals.data.category = result;
	// 			next(err);
	// 		});
	// 	} else {
	// 		next();
	// 	}
	// });
	// Load the posts
	view.on('init', function (next) {
		var q = keystone.list('Post').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate')
			.populate('author categories');
			
		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}

		q.exec(function (err, results) {
			locals.data.posts = results;
			next(err);
		});
	});
	view.render('index');
};
