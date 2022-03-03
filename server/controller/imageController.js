const path = require("path");
exports.getFile = function (image_path) {
  return path.join(__dirname, "../../client/public/uploads/", image_path);
};
