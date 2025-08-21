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
      console.log(file);
      const ext = file.mimetype.split("/")[1];
      if (!fileTypeCol.includes(ext)) {
        return cb(new Error("file type not allowed"), false);
      }
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  return multer({ storage });
};

module.exports = fileUploadHandler;
