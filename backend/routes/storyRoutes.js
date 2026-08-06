import { Router } from "express";
import {
  getStory,
  addStory,
  updateStory,
  deleteStory
} from "../controllers/storyController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/", getStory);
router.post("/", protect, addStory);
router.put("/:id", protect, updateStory);
router.delete("/:id", protect, deleteStory);

export default router;
