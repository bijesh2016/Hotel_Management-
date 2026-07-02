const pool = require("../../config/database.config");

const createHotel = async (
  name,
  description,
  address,
  city,
  country,
  star_rating,
  owner_id,
) => {
  const query = `
    INSERT INTO hotels
    (
      name,
      description,
      address,
      city,
      country,
      star_rating,
      owner_id
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *;
  `;

  const values = [
    name,
    description,
    address,
    city,
    country,
    star_rating,
    owner_id,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getAllHotels = async () => {
  const result = await pool.query(`
    SELECT *
    FROM hotels
    ORDER BY created_at DESC
  `);

  return result.rows;
};

const getHotelById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM hotels
    WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
};

const updateHotel = async (
  id,
  name,
  description,
  address,
  city,
  country,
  star_rating,
) => {
  const result = await pool.query(
    `
    UPDATE hotels
    SET
      name = $1,
      description = $2,
      address = $3,
      city = $4,
      country = $5,
      star_rating = $6
    WHERE id = $7
    RETURNING *;
    `,
    [name, description, address, city, country, star_rating, id],
  );

  return result.rows[0];
};

const deleteHotel = async (id) => {
  await pool.query(
    `
    DELETE FROM hotels
    WHERE id = $1
    `,
    [id],
  );
};

module.exports = {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
};
