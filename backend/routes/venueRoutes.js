import { Router } from "express";
import { getVenue, updateVenue } from "../controllers/venueController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/", getVenue);
router.put("/", protect, updateVenue);

export default router;
