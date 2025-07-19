const { unlink } = require("fs");

exports.deleteFile = async (filePath) => {
  await unlink(filePath, (err) => {
    if (err) throw err.message;
  });
};
