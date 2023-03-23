var keystone = require('keystone');
var Types = keystone.Field.Types;

/**=====================
 * 	ContactUsText Model
 * =====================
 */

 // Set CREATE / EDIT privilges.
// -> Keep both false until PROD. At that point, turn nocreate to true.
var ContactUsText = new keystone.List('ContactUsText', {
	nocreate: true,
	noedit: false,
});

// Set fields (this order determines display order in the CMS.)
ContactUsText.add({
	name: { type: String },
	textTop: { type: String },
	textBottom: { type: String },
	// updated: { type: Date, default: Date.now },
});

// VIRTUAL SCHEMAS => Useful combinations of things that don't make good Mongo fields.
// Talent.schema.virtual('content.__a_combination_of_stuff__').get(function () {
	// return this.content.__first__ + this.content.__second__;
// });

ContactUsText.defaultSort = 'text';
ContactUsText.defaultColumns = 'name, text';
ContactUsText.register();