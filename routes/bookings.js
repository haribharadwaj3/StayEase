const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// Get all bookings
router.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ date: 1, time: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new booking
router.post('/api/bookings', async (req, res) => {
  try {
    // Check if user already has a booking for the same date and time
    const existingUserBooking = await Booking.findOne({
      email: req.body.email,
      date: req.body.date,
      time: req.body.time
    });

    if (existingUserBooking) {
      return res.status(400).json({ 
        message: 'You already have a booking at this time slot' 
      });
    }

    // Check if the time slot is already booked for this house
    const existingTimeSlot = await Booking.findOne({
      houseId: req.body.houseId,
      date: req.body.date,
      time: req.body.time
    });

    if (existingTimeSlot) {
      return res.status(400).json({ 
        message: 'This time slot is already booked for this house' 
      });
    }

    // Create new booking if all validations pass
    const booking = new Booking({
      houseId: req.body.houseId,
      houseName: req.body.houseName,
      name: req.body.name,
      email: req.body.email,
      date: req.body.date,
      time: req.body.time
    });

    const newBooking = await booking.save();
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: newBooking
    });

  } catch (error) {
    console.error('Booking error:', error);
    res.status(400).json({ 
      success: false,
      message: error.message || 'Error creating booking' 
    });
  }
});

// Delete booking
router.delete('/api/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error cancelling booking' });
  }
});

module.exports = router;