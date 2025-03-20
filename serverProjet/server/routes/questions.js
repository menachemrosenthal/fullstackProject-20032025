import pool from '../database.js';

const postQuestion = async (req, res) => {
  const { student_id, rabbi_id, question } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO questions (student_id, rabbi_id, question) VALUES (?, ?, ?)',
            [student_id, rabbi_id, question]
        );
        res.status(201).json({ id: result.insertId, student_id, rabbi_id, question });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllQuestionsofRabbi = async (req, res) => {
  const { rabbi_id } = req.params;
    try {
        //const [rows] = await pool.query('SELECT * FROM questions WHERE rabbi_id = ?', [rabbi_id]);
        const [rows] = await pool.query(
          `SELECT q.* 
           FROM questions q
           LEFT JOIN answers a ON q.id = a.question_id
           WHERE q.rabbi_id = ? AND a.question_id IS NULL`,
          [rabbi_id]
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllQuestionsofStudent = async (req, res) => {
  const { student_id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM questions WHERE student_id = ?', [student_id]);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

export { postQuestion, getAllQuestionsofRabbi , getAllQuestionsofStudent};