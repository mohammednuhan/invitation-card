import { Router } from "express";
import {
  getCountdown,
  updateCountdown
} from "../controllers/countdownController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/", getCountdown);
router.put("/", protect, updateCountdown);

export default router;
