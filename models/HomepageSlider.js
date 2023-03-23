var keystone = require("keystone");
var Types = keystone.Field.Types;

/**====================
 * 	HomepageSlider Model
 * ====================
 */

var HomepageSlider = new keystone.List("HomepageSlider", {
  nocreate: false,
  noedit: false,
});

HomepageSlider.add({
  name: { type: String },
  image: { type: Types.CloudinaryImage },
  sortOrder: {
    type: Types.Select,
    options: [
      // Select dropdown
      { value: 1, label: 1 },
      { value: 2, label: 2 },
      { value: 3, label: 3 },
      { value: 4, label: 4 },
      { value: 5, label: 5 },
      { value: 6, label: 6 },
      { value: 7, label: 7 },
      { value: 8, label: 8 },
    ],
  },
  updated: { type: Date, default: Date.now },
});

HomepageSlider.defaultSort = "sortOrder";
HomepageSlider.defaultColumns = "name, sortOrder";
HomepageSlider.register();
