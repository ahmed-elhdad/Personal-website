import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Set storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
// Filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};
export const upload = multer({ storage, fileFilter });
// Storage configuration for product images
const projectStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `user-${uniqueSuffix}${ext}`);
  },
});
// File filter for images
const imageFilter = (req, file, cb) => {
  // Allowed image types
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      new Error("Only image files are allowed! (jpeg, jpg, png, gif, webp)"),
      false,
    );
  }
};

// Multer instance for project images (multiple files)
export const uploadProductImages = multer({
  storage: projectStorage,
  limits: {},
  fileFilter: imageFilter,
}).array("images", 10); // Allow up to 10 images
// Multer instance for single project image
export const uploadSingleProductImage = multer({
  storage: projectStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: imageFilter,
}).single("image");
// Helper function to get file URL
export const getFileUrl = (filePath) => {
  if (!filePath) return null;
  // If it's already a URL, return it
  if (filePath.startsWith("http")) return filePath;
  // Otherwise, construct the URL
  const relativePath = filePath.replace(uploadsDir, "").replace(/\\/g, "/");
  return `/uploads${relativePath}`;
};
// Helper function to get product image URL
export const getProjectImageUrl = (filename) => {
  if (!filename) return null;
  if (filename.startsWith("http")) return filename;
  return `/uploads/${filename}`;
};
export { uploadsDir };
