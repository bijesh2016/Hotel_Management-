const reservationService = require("./reservation.service");

const createReservation = async (req, res) => {
  try {
    const {
      room_id,
      check_in,
      check_out,
      guests,
    } = req.body;

    // 1. Validate dates
    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({
        message: "Check-out must be after check-in",
      });
    }

    // 2. Create booking with transaction (backend calculates price)
    const reservation =
      await reservationService.createReservationWithTransaction(
        req.user.id,
        room_id,
        check_in,
        check_out,
        guests
      );

    res.status(201).json({
      message: "Room booked successfully",
      reservation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getMyReservations = async (req, res) => {
  try {
    const reservations =
      await reservationService.getUserReservations(
        req.user.id
      );

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllReservations = async (req, res) => {
  try {
    const reservations =
      await reservationService.getAllReservations();

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated =
      await reservationService.updateStatus(
        req.params.id,
        status
      );

    res.json({
      message: "Reservation updated",
      updated,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReservation,
  getMyReservations,
  getAllReservations,
  updateStatus,
};