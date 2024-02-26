import React, { useState } from 'react';
import './Quizcard.css';

// Quizcard component
const Quizcard = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      props.onAnswer(selectedOption);
      console.log("Submitted from quizcard");
    }
  };

  return (
    <div className="quiz-card">
      <div className="question-container">
        <h3 className="question">{props.question}</h3>
      </div>
      <div className="options-container">
        {props.choices1 && (
          <div
            className={`option ${selectedOption === 0 ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(0)}
          >
            {props.choices1}
          </div>
        )}
        {props.choices2 && (
          <div
            className={`option ${selectedOption === 1 ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(1)}
          >
            {props.choices2}
          </div>
        )}
        {props.choices3 && (
          <div
            className={`option ${selectedOption === 2 ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(2)}
          >
            {props.choices3}
          </div>
        )}
        {props.choices4 && (
          <div
            className={`option ${selectedOption === 3 ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(3)}
          >
            {props.choices4}
          </div>
        )}
      </div>
      <div className="save-container">
        <button className="save-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Quizcard;
