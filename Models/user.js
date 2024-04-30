const pool = require("../config.js");

// get the users
const getUsers = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM USERS`);
    const users = result.rows;
    client.release();
    return users;
  } catch (error) {
    console.error("Error Getting Users", error);
    throw error;
  }
};

// post users
const addUsers = async (name, email) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`,
      [name, email]
    );
    client.release();
    return result;
  } catch (error) {
    console.error("Error Getting Users", error);
    throw error;
  }
};

// update users
const updateUsers = async (id, name, email) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *`,
      [name, email, id]
    );
    const updateUser = result.rows[0];
    client.release();
    return updateUser;
  } catch (error) {
    console.error("Error Getting Users", error);
    throw error;
  }
};

const deleteUsers = async (id) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [id]
    );
    const removeUser = result.rows[0];
    client.release();
    return removeUser;
  } catch (error) {
    console.error("Error Getting Users", error);
    throw error;
  }
};

module.exports = {
  getUsers,
  addUsers,
  updateUsers,
  deleteUsers,
};
