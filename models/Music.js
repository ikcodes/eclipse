var keystone = require("keystone");
var Types = keystone.Field.Types;

/**===============
 * 	Music Model
 * ===============
 */

var Music = new keystone.List("Music", {
  nocreate: false,
  noedit: false,
});

Music.add({
  name: { type: String, required: true },
  image: { type: Types.CloudinaryImage },
  content: { type: Types.Html, wysiwyg: true, height: 400 },
  sortOrder: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

Music.defaultSort = "sortOrder, name";
Music.defaultColumns = "name, artist, sortOrder, createdAt";
Music.register();
