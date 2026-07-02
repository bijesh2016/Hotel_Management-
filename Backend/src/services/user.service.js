const pool = require("../config/database.config");

const createUser = async (full_name, email, hashedPassword, role) => {
  const query = `
    INSERT INTO users (full_name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, full_name, email, role;
  `;

  const values = [full_name, email, hashedPassword, role];

  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  createUser,
};