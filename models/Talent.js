var keystone = require("keystone");
var Types = keystone.Field.Types;

/**===============
 * 	Talent Model
 * ===============
 */

var Talent = new keystone.List("Talent", {
  nocreate: false,
  noedit: false,
  autokey: { path: "slug", from: "name", unique: true },
});

Talent.add({
  name: { type: Types.Name, required: true },
  category: {
    type: Types.Select,
    options: [
      // Select dropdown
      { value: "Management", label: "Management" },
      { value: "Publishing", label: "Publishing" },
      { value: "Catalog Writer", label: "Catalog Writer" },
      { value: "Management & Publishing", label: "Management & Publishing" },
      { value: "Management & Catalog Writer", label: "Management & Catalog Writer" },
    ],
  },
  image: { type: Types.CloudinaryImage },
  bio: { type: Types.Html, wysiwyg: true, height: 400 },
  SocialLinks: {
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String },
  },
  websiteLink: { type: String },
  sortOrder: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

Talent.defaultSort = "sortOrder, name";
Talent.defaultColumns = "name, sortOrder, createdAt";
Talent.register();
