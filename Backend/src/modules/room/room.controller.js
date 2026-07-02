const roomService = require("./room.service");

const createRoom = async (req, res) => {
  try {
    const {
      hotel_id,
      room_type_id,
      room_number,
      floor_number,
    } = req.body;

    const room = await roomService.createRoom(
      hotel_id,
      room_type_id,
      room_number,
      floor_number
    );

    res.status(201).json({
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms =
      await roomService.getRoomsByHotel(
        req.params.hotelId
      );

    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRoom = async (req, res) => {
  try {
    const room =
      await roomService.getRoomById(req.params.id);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const {
      room_number,
      floor_number,
      status,
      room_type_id,
    } = req.body;

    const room = await roomService.updateRoom(
      req.params.id,
      room_number,
      floor_number,
      status,
      room_type_id
    );

    res.json({
      message: "Room updated successfully",
      room,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    await roomService.deleteRoom(req.params.id);

    res.json({
      message: "Room deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createRoom,
    getRooms,
    getRoom,
    updateRoom,
    deleteRoom,
};