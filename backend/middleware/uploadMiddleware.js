import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Recreating __dirname equivalent functionality needed for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// CREATING UPLOAD DIRECTORY
// ==========================================
const uploadDirectory = path.join(__dirname, "../uploads/event-images");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

// ==========================================
// MULTER STORAGE CONFIGURATION
// ==========================================
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, uploadDirectory);
  },
  filename: (request, file, callback) => {
    const uniqueFileName = `${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}${path.extname(file.originalname)}`;
    callback(null, uniqueFileName);
  },
});

// ==========================================
// FILE FILTER (Images Only)
// ==========================================
const fileFilter = (request, file, callback) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedFileTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(
      new Error("Only JPG, JPEG, PNG and WEBP images are allowed"),
      false,
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Single target processing named middleware execution wrapper
// Change this line in uploadMiddleware.js
const uploadEventImage = upload.single("image_url"); // Match the frontend key 'image_url'

export default uploadEventImage;
