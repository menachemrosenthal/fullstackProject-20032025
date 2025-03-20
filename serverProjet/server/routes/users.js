import pool from '../database.js';

const getUsersByRole = async (req, res) => {
    const { role } = req.query;
    try {
    //   let query = 'SELECT * FROM users';
    //   if (role) {
    //     query += ' WHERE role = ?';
    //   }
      const [users] = await pool.query('SELECT * FROM users WHERE role = ?', [role]);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
};


export {getUsersByRole};