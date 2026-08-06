import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { uploadFile } from "../controllers/uploadController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/", protect, upload.single("file"), uploadFile);

export default router;
