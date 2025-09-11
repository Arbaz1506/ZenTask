const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary"); // make sure config is correct

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "zentask/users",            // all user images in this folder
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// File filter (optional, Cloudinary also restricts formats)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only jpg, jpeg, png, webp formats are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
