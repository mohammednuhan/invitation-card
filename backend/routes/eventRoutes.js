import { Router } from "express";
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/", getEvents);
router.post("/", protect, addEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

export default router;
