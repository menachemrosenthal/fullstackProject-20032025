import React, { useState, useEffect } from 'react';
import { postData, fetchData } from '../api';

const AnswerQuestion = ({ user }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await fetchData(`questions/rabbi/${user.id}`);
        setQuestions(res);
      } catch (error) {
        setMessage(error.message);
      }
    };

    getQuestions();
  }, [user.id]);

  const handleAnswerQuestion = async () => {
    if (!selectedQuestion) {
      setMessage('Please select a question to answer.');
      return;
    }

    try {
      const data = { question_id: selectedQuestion.id, rabbi_id: user.id, answer };
      await postData('answers', data);
      setMessage('Answer submitted successfully');
      setAnswer('');
      setSelectedQuestion(null);

      const questions = await fetchData(`questions/rabbi/${user.id}`);
      setQuestions(questions);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Answer Questions</h2>
      <div>
        {questions.map((question) => (
          <button
            key={question.id}
            onClick={() => setSelectedQuestion(question)}
            style={{ backgroundColor: selectedQuestion?.id === question.id ? 'lightblue' : '' }}
          >
            {question.question}
          </button>
        ))}
      </div>
      {selectedQuestion && (
        <div>
          <h3>Answering: {selectedQuestion.question}</h3>
          <textarea
            placeholder="Your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button onClick={handleAnswerQuestion}>Submit Answer</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AnswerQuestion;
