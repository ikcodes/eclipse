var keystone = require("keystone");
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List("User");

User.add(
  {
    name: { type: Types.Name, required: true, index: true },
    username: { type: String, initial: true, required: true, unique: true, index: true },
    password: { type: Types.Password, initial: true, required: true },
  },
  "Permissions",
  {
    isAdmin: { type: Boolean, label: "Can access Keystone", index: true },
  }
);

User.schema.virtual("canAccessKeystone").get(function () {
  return this.isAdmin;
});

/**
 * Relationships
 */
User.relationship({ ref: "Post", path: "posts", refPath: "author" });

/**
 * What columns appear in list view?
 */
User.defaultColumns = "name, email, isAdmin";
User.register();
