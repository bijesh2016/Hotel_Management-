const pool = require("../../config/db");

const checkAvailability = async (
  room_id,
  check_in,
  check_out
) => {

  const result = await pool.query(
    `
    SELECT id
    FROM reservations
    WHERE room_id = $1
    AND status IN (
      'pending_payment',
      'confirmed',
      'checked_in'
    )
    AND (
      check_in < $3
      AND
      check_out > $2
    )
    `,
    [room_id, check_in, check_out]
  );

  return result.rows.length === 0;
};


const createReservationWithTransaction = async (
  user_id,
  room_id,
  check_in,
  check_out,
  guests
) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Check availability
    const availabilityResult = await client.query(
      `
      SELECT id
      FROM reservations
      WHERE room_id = $1
      AND status IN (
        'pending_payment',
        'confirmed',
        'checked_in'
      )
      AND (
        check_in < $3
        AND
        check_out > $2
      )
      `,
      [room_id, check_in, check_out]
    );

    if (availabilityResult.rows.length > 0) {
      await client.query('ROLLBACK');
      throw new Error('Room is already booked for these dates');
    }

    // 2. Get room price
    const roomResult = await client.query(
      `
      SELECT rt.price_per_night
      FROM rooms r
      JOIN room_types rt ON r.room_type_id = rt.id
      WHERE r.id = $1
      `,
      [room_id]
    );

    if (roomResult.rows.length === 0) {
      await client.query('ROLLBACK');
      throw new Error('Room not found');
    }

    const pricePerNight = roomResult.rows[0].price_per_night;

    // 3. Calculate nights and total amount
    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalAmount = pricePerNight * nights;

    // 4. Create reservation
    const result = await client.query(
      `
      INSERT INTO reservations
      (user_id, room_id, check_in, check_out, guests, total_amount, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
      `,
      [
        user_id,
        room_id,
        check_in,
        check_out,
        guests,
        totalAmount,
        'pending_payment'
      ]
    );

    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};


const createReservation = async (
  user_id,
  room_id,
  check_in,
  check_out,
  guests,
  total_amount
) => {
  const result = await pool.query(
    `
    INSERT INTO reservations
    (user_id, room_id, check_in, check_out, guests, total_amount)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *;
    `,
    [
      user_id,
      room_id,
      check_in,
      check_out,
      guests,
      total_amount,
    ]
  );

  return result.rows[0];
};

const getUserReservations = async (user_id) => {
  const result = await pool.query(
    `
    SELECT 
      rsv.*,
      rm.room_number,
      rt.type_name,
      h.name AS hotel_name
    FROM reservations rsv
    JOIN rooms rm ON rsv.room_id = rm.id
    JOIN room_types rt ON rm.room_type_id = rt.id
    JOIN hotels h ON rm.hotel_id = h.id
    WHERE rsv.user_id = $1
    ORDER BY rsv.created_at DESC;
    `,
    [user_id]
  );

  return result.rows;
};

const getAllReservations = async () => {
  const result = await pool.query(
    `
    SELECT * FROM reservations
    ORDER BY created_at DESC
    `
  );

  return result.rows;
};

const updateStatus = async (id, status) => {
  const result = await pool.query(
    `
    UPDATE reservations
    SET status = $1
    WHERE id = $2
    RETURNING *;
    `,
    [status, id]
  );

  return result.rows[0];
};


module.exports = {
  checkAvailability,
  createReservation,
  createReservationWithTransaction,
  getUserReservations,
  getAllReservations,
  updateStatus,
};

