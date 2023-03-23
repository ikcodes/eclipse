var keystone = require("keystone");
var Types = keystone.Field.Types;

/**=====================
 * 	TermsOfService Model
 * =====================
 */

var TermsOfService = new keystone.List("TermsOfService", {
  nocreate: false,
  noedit: false,
});

TermsOfService.add({
  name: { type: String },
  terms: { type: Types.Html, wysiwyg: true, height: 400 },
});

TermsOfService.defaultSort = "text";
TermsOfService.defaultColumns = "name, text";
TermsOfService.register();
