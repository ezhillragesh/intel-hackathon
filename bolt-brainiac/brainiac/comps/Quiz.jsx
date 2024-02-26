import React, { useState, useEffect } from 'react';
import Quizcard from "./Quizcard";

const cppTopics = ["STL", "iterators", "Templates", "Pointers", "OOPs", "File Handling", "Exception Handling", "Arrays"];
const pythonTopics = ["Functions", "Data-types", "Loops", "Files Handling", "Exception Handling", "OOPs", "Modules", "Regular Expressions", "Collections"];
const ERROR_ARR = [];

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [errorTopics, setErrorTopics] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const chosenTopics = [...cppTopics];
      const randomTopics = [];
      while (randomTopics.length < 3) {
        const randomIndex = Math.floor(Math.random() * chosenTopics.length);
        randomTopics.push(chosenTopics.splice(randomIndex, 1)[0]);
      }

      const questionsData = [];
      for (const topic of randomTopics) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          "language": "cpp",
          "difficulty": "beginner",
          "topic": topic,
          "numQuestions": 3
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };

        try {
          const response = await fetch("https://bolt-backend.onrender.com/", requestOptions);
          const data = await response.json();
          if (data && data.jsonQuestions && data.jsonQuestions.questions) {
            questionsData.push(...data.jsonQuestions.questions);
          } else {
            console.error('Invalid API response:', data);
          }
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      }

      // Check if we have enough questions
      if (questionsData.length < 9) {
        // Fetch additional questions to make up the difference
        const additionalQuestionsNeeded = 9 - questionsData.length;
        const additionalQuestions = await fetchAdditionalQuestions(additionalQuestionsNeeded);
        questionsData.push(...additionalQuestions);
      }

      setQuestions(questionsData);
    };

    fetchQuestions();
  }, []);

  const fetchAdditionalQuestions = async (numQuestions) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "language": "cpp",
      "difficulty": "beginner",
      "numQuestions": numQuestions
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("https://bolt-backend.onrender.com/", requestOptions);
      const data = await response.json();
      if (data && data.jsonQuestions && data.jsonQuestions.questions) {
        return data.jsonQuestions.questions;
      } else {
        console.error('Invalid API response:', data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      return [];
    }
  };

  const handleAnswer = (selectedOption, correctOption, topic) => {
    if (selectedOption !== correctOption && topic && !errorTopics.includes(topic)) {
      setErrorTopics(prevErrorTopics => [...prevErrorTopics, topic]);
      if (!ERROR_ARR.includes(topic)) {
        ERROR_ARR.push(topic);
      }
      console.log("Submitted from quiz/tsx");
      console.log("ERROR_ARR:", ERROR_ARR);
      console.log("Wrong topic:", topic);
    }
  };

  return (
    <div>
      {questions.map((question, index) => (
  <Quizcard
    key={index}
    question={question.query}
    choices1={question.choices[0]}
    choices2={question.choices[1]}
    choices3={question.choices[2]}
    choices4={question.choices[3]}
    correct={question.answer}
    topic={question.topic} // Ensure that the topic prop is passed
    onAnswer={(selectedOption) => handleAnswer(selectedOption, question.answer, question.topic)}
  />
))}
      {/* Show the error topics array */}
      <div>Error Topics: {errorTopics.join(', ')}</div>
    </div>
  );
}

export default Quiz;
