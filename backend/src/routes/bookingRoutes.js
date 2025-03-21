import express from 'express';
import * as bookingController from '../controllers/bookingController.js';
const router = express.Router();

router.post('/bookings', bookingController.createBooking);
router.get('/bookings/user/:userId', bookingController.getUserBookings);
router.get('/bookings', bookingController.getAllBookings);
router.put('/bookings/:id/cancel', bookingController.cancelBooking);
router.put('/bookings/:id/status', bookingController.updateBookingStatus);

export default router;
