const multer = require("multer");
const path = require("path");

// Memory storage instead of disk storage
const storage = multer.memoryStorage();

// Multer configuration with additional validation and file size limit
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    // Check if the file extension is an image (jpg, jpeg, png)
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      return cb(new Error("Only images (.jpg, .jpeg, .png) are allowed"), false);
    }
    cb(null, true); // Accept the file
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
});

module.exports = upload;
