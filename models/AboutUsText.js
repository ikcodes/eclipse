var keystone = require("keystone");
var Types = keystone.Field.Types;

/**=====================
 * 	AboutUsText Model
 * =====================
 */

var AboutUsText = new keystone.List("AboutUsText", {
  nocreate: false,
  noedit: false,
});

AboutUsText.add({
  name: { type: String },
  content: { type: Types.Html, wysiwyg: true, height: 400 },
});

AboutUsText.defaultSort = "text";
AboutUsText.defaultColumns = "name, text";
AboutUsText.register();
