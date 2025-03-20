import pool from '../database.js';

const postAnswer = async (req, res) => {
  const { question_id, rabbi_id, answer } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO answers (question_id, rabbi_id, answer) VALUES (?, ?, ?)',
            [question_id, rabbi_id, answer]
        );
        res.status(201).json({ id: result.insertId, question_id, rabbi_id, answer });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAnswerofQuestion = async (req, res) => {
  const { question_id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM answers WHERE question_id = ?', [question_id]);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


export { postAnswer, getAnswerofQuestion };