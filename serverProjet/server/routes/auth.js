import pool from "../database.js";

// implementation of auth route functions
// register a new user

const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, password, role]
    );

    res.status(201).json({ id: result.id, username, role });
  } catch (error) {
    console.error('Database error:', error); // Log the full error object
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// login a user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// export functions

export { registerUser, loginUser };
