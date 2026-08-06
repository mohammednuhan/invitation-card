import { Router } from "express";
import { getCouple, updateCouple } from "../controllers/coupleController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/", getCouple);
router.get("/:slug", getCouple);
router.put("/", protect, updateCouple);

export default router;
