const multer = require("multer");
const path = require("path");
const createFolder = require("../util/foldecreate");

const fileUploadHandler = (folderName, fileTypeCol) => {
  createFolder(folderName);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folderName);
    },
    filename: function (req, file, cb) {
      if (!fileTypeCol.incudes(file.mimetype.split("/")[1]))
        return cb(null, false);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  return multer({ storage });
};

module.exports = fileUploadHandler;
