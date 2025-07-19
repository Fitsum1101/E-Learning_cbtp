const fs = require("fs");
const path = require("path");
module.exports = (name) => {
  const uploadDir = path.join(require.main.path, name);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
};
