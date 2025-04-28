const multer = require("multer");
const path = require("path");

// Memory storage instead of disk storage
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      return cb(new Error("Only images are allowed"), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
