import { Router } from "express";
import { getFamily, updateFamily } from "../controllers/familyController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/", getFamily);
router.put("/", protect, updateFamily);

export default router;
