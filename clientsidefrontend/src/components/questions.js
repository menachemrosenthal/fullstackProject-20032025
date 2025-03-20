import React, { useState, useEffect } from "react";
import { postData, fetchData } from "../api";
const AskQuestion = ({ user }) => {
  const [question, setQuestion] = useState("");
  const [selectedRabbi, setSelectedRabbi] = useState(null);
  const [rabbis, setRabbis] = useState([]);
  const [message, setMessage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [chosenQuestion, setChosenQuestion] = useState("");

  useEffect(() => {
    const getRabbis = async () => {
      try {
        const rabbis = await fetchData("users?role=rabbi");
        setRabbis(rabbis);
      } catch (error) {
        setMessage(error.message);
      }
    };
    const getQuestions = async () => {
      try {
        const response = await fetchData(`questions/student/${user.id}`);
        setQuestions(response);
      } catch (error) {
        setMessage(error.message);
      }
    };
    getQuestions();

    getRabbis();
  }, [user.id]);

  const handleAskQuestion = async () => {
    if (!selectedRabbi) {
      setMessage("Please select a Rabbi to ask a question.");
      return;
    }

    try {
      const data = {
        student_id: user.id,
        rabbi_id: selectedRabbi.id,
        question,
      };
      await postData("questions", data);
      setMessage("Question asked successfully");
      setQuestion("");
      const res = await fetchData(`questions/student/${user.id}`);
      setQuestions(res);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const checkForAnswer = async (q) => {
    setChosenQuestion(q);
    try {
      const response = await fetchData(`answers/${q.id}`);
      if (response.length === 0) {
        setMessage("No answer yet");
      } else {
        setMessage(response[0].answer);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Ask a Question</h2>
      
      <div>
        {rabbis.map((rabbi) => (
          <button
            key={rabbi.id}
            onClick={() => setSelectedRabbi(rabbi)}
            style={{
              backgroundColor:
                selectedRabbi?.id === rabbi.id ? "lightblue" : "",
            }}
          >
            {rabbi.username}
          </button>
        ))}
      </div>
      {selectedRabbi && (
        <div>
          <h3>Ask {selectedRabbi.username} a question:</h3>
          <textarea
            placeholder="Your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={handleAskQuestion}>Ask Question</button>
        </div>
      )}
      {message && <p>{message}</p>}
      <div>
        {questions.map((q) => (
          <button
            key={q.id}
            onClick={() => checkForAnswer(q)}
            style={{
                backgroundColor: chosenQuestion?.id === q.id ? "lightblue" : "",
            }}
          >
            {q.question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AskQuestion;
