const pool = require("../../config/db");

const createRoom = async (
  hotel_id,
  room_type_id,
  room_number,
  floor_number,
) => {
  const result = await pool.query(
    `
    INSERT INTO rooms
    (hotel_id, room_type_id, room_number, floor_number)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
    [hotel_id, room_type_id, room_number, floor_number],
  );

  return result.rows[0];
};

const getRoomsByHotel = async (hotel_id) => {
  const result = await pool.query(
    `
    SELECT 
      r.*,
      rt.type_name,
      rt.price_per_night
    FROM rooms r
    JOIN room_types rt ON r.room_type_id = rt.id
    WHERE r.hotel_id = $1
    ORDER BY r.room_number;
    `,
    [hotel_id],
  );

  return result.rows;
};

const getRoomById = async (id) => {
  const result = await pool.query(
    `
    SELECT 
      r.*,
      rt.type_name,
      rt.price_per_night
    FROM rooms r
    JOIN room_types rt ON r.room_type_id = rt.id
    WHERE r.id = $1
    `,
    [id],
  );

  return result.rows[0];
};

const updateRoom = async (
  id,
  room_number,
  floor_number,
  status,
  room_type_id,
) => {
  const result = await pool.query(
    `
    UPDATE rooms
    SET
      room_number = $1,
      floor_number = $2,
      status = $3,
      room_type_id = $4
    WHERE id = $5
    RETURNING *;
    `,
    [room_number, floor_number, status, room_type_id, id],
  );

  return result.rows[0];
};

const deleteRoom = async (id) => {
  await pool.query(`DELETE FROM rooms WHERE id = $1`, [id]);
};

module.exports = {
  createRoom,
  getRoomsByHotel,
  getRoomById,
  updateRoom,
  deleteRoom,
};
