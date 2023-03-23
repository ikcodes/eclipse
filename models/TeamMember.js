var keystone = require("keystone");
var Types = keystone.Field.Types;

/**==================
 * 	TeamMember Model
 * ==================
 */

// Initialize your list and SET noCREATE / noEDIT to FALSE.
var TeamMember = new keystone.List("TeamMember", {
  autokey: {
    path: "slug",
    from: "name",
    unique: true,
  },
});

TeamMember.add({
  name: { type: Types.Name, required: true },
  role: { type: String },
  quote: { type: String },
  image: { type: Types.CloudinaryImage },
  bio: { type: Types.Html, wysiwyg: true, height: 400 },
  sortOrder: { type: Number },
  updated: { type: Date, default: Date.now },
});

// VIRTUAL SCHEMAS => Useful combinations of things that don't make good Mongo fields.
TeamMember.schema.virtual("content.full").get(function () {
  return this.content.extended || this.content.brief;
});

TeamMember.defaultSort = "sortOrder, name";
TeamMember.defaultColumns = "name, sortOrder, createdAt";
TeamMember.register();
