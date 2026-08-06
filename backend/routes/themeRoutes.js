import { Router } from "express";
import { getTheme, updateTheme } from "../controllers/themeController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/", getTheme);
router.put("/", protect, updateTheme);

export default router;
