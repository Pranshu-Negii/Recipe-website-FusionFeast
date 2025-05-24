import express from "express";
import multer from "multer";
import {
  submitRecipe,
  getRecipesByStatus,
  approveRecipe,
  rejectRecipe,
  deleteRecipe,
  addRecipeManually,
  getRecipeById,
} from "../controllers/recipeController.js";

const router = express.Router();

// Multer config: store images in uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});
const upload = multer({ storage });

// Submit with image (Multer)
router.post("/submit", upload.single("image"), submitRecipe);

// Admin routes
router.get("/", getRecipesByStatus);              
router.patch("/:id/approve", approveRecipe);
router.patch("/:id/reject", rejectRecipe);
router.delete("/:id", deleteRecipe);
router.post("/", upload.single("image"), addRecipeManually);


// Get single recipe by ID
router.get("/:id", getRecipeById);

export default router;
