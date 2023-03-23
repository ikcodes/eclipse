var keystone = require("keystone");
var Types = keystone.Field.Types;

/**===========
 * 	SEO Model	=> Echoes SEO values into the page's HTML header.
 * ===========
 */

var SEO = new keystone.List("SEO", {
  nocreate: false,
  noedit: false,
});

SEO.add({
  name: { type: String },
  field: { type: String },
  value: { type: String },
});

// Columns shown in CMS list view.
SEO.defaultColumns = "name, value";
SEO.register();
