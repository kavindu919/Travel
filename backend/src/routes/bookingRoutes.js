import express from "express";
import {
  cancelBooking,
  createBooking,
  getAllBookings,
  getUserBookings,
} from "../controllers/bookingController.js";
const router = express.Router();

router.post("/bookings", createBooking);
router.get("/bookings/user/:userId", getUserBookings);
router.get("/bookings", getAllBookings);
router.post("/bookings/:id/cancel", cancelBooking);
// router.post("/bookings/:id/status", updateBookingStatus);

export default router;
