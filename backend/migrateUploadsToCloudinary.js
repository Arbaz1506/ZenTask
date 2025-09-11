require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const cloudinary = require("./config/cloudinary");
const User = require("./models/User");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const migrateImages = async () => {
  try {
    const users = await User.find({});

    for (let user of users) {
      if (user.profileImageUrl && user.profileImageUrl.startsWith("uploads/")) {
        const localPath = path.join(__dirname, user.profileImageUrl);

        if (fs.existsSync(localPath)) {
          const result = await cloudinary.uploader.upload(localPath, {
            folder: "zentask/users",
          });

          user.profileImageUrl = result.secure_url;
          await user.save();

          console.log(`Uploaded for user: ${user.email}`);
        }
      }
    }

    console.log("All uploads migrated!");
    process.exit(0);
  } catch (error) {
    console.log("Migration error:", error);
    process.exit(1);
  }
};

migrateImages();
