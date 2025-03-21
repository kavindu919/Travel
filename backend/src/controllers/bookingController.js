import prisma from "../lib/prismaClient.js";

// Create a booking
export const createBooking = async (req, res) => {
  const { userId, packageId, travelDate, numTravelers, specialRequest } = req.body;

  try {
    // Ensure the travel package exists
    const travelPackage = await prisma.travelpackage.findUnique({
      where: { id: packageId },
    });

    if (!travelPackage) {
      return res.status(404).json({ error: "Travel package not found." });
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        userId,
        packageId,
        travelDate,
        numTravelers,
        specialRequest,
      },
    });

    return res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};

// Get all bookings for a user
export const getUserBookings = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        travelPackage: true, // Include travel package details
      },
    });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: "No bookings found for this user." });
    }

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};

// Get all bookings (admin or general use case)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        travelPackage: true, 
        user: true, 
        payment: true, 
      },
    });

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
  const { id } = req.params;
}