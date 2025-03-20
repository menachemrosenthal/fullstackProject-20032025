import express from 'express';
import cors from 'cors'; 
import bodyParser from 'body-parser';
import { registerUser, loginUser } from './routes/auth.js';
// imports for qustions
import { postQuestion, getAllQuestionsofRabbi, getAllQuestionsofStudent } from "./routes/questions.js";
import { postAnswer, getAnswerofQuestion} from "./routes/answers.js";
import{getUsersByRole} from "./routes/users.js";

const app = express();
const port = process.env.PORT || 8000;

// Enable CORS for all domains (not recommended for production, but useful for development)
app.use(cors());  // Allow all origins

// If you want to allow only specific origins (e.g., localhost:3000), use:
app.use(cors({
  origin: 'http://localhost:3000'  // Replace with your frontend URL
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Auth routes
app.post('/auth/register', registerUser );
app.post('/auth/login', loginUser);
// questions routes
app.post('/questions',postQuestion);
app.get('/questions/rabbi/:rabbi_id', getAllQuestionsofRabbi);
app.get('/questions/student/:student_id', getAllQuestionsofStudent);
// answers routes
app.post('/answers',postAnswer);
app.get('/answers/:question_id',getAnswerofQuestion);
// user routes
app.get('/users',getUsersByRole);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});