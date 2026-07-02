const hotelService = require("./hotel.service");

const createHotel = async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      city,
      country,
      star_rating,
    } = req.body;

    const hotel = await hotelService.createHotel(
      name,
      description,
      address,
      city,
      country,
      star_rating,
      req.user.id
    );

    res.status(201).json({
      message: "Hotel created successfully",
      hotel,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


const getHotels = async (req, res) => {
  try {
    const hotels = await hotelService.getAllHotels();

    res.json(hotels);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


const getHotel = async (req, res) => {
  try {
    const hotel = await hotelService.getHotelById(
      req.params.id
    );

    if (!hotel) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    res.json(hotel);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


const updateHotel = async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      city,
      country,
      star_rating,
    } = req.body;

    const hotel = await hotelService.updateHotel(
      req.params.id,
      name,
      description,
      address,
      city,
      country,
      star_rating
    );

    res.json({
      message: "Hotel updated successfully",
      hotel,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


const deleteHotel = async (req, res) => {
  try {
    await hotelService.deleteHotel(req.params.id);

    res.json({
      message: "Hotel deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
};