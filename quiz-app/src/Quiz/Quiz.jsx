import React, { useEffect, useState } from "react";
import Question from "../Question/Question";
import { Button } from "antd";

const Quiz = ({ quizList, duration, setQuizList }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(duration); // Set the duration of the quiz in seconds
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  console.log(quizList, "quizList");

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setRemainingTime(remainingTime - 1);

      // If the remaining time is less than or equal to 0, move on to the next question
      if (remainingTime <= 0) {
        handleNextQuestion();
      }
    }, 1000);

    return () => {
      clearInterval(countdownTimer);
    };
  }, [currentQuestionIndex, remainingTime]);

  const handleNextQuestion = () => {
    // Check if the user has completed the quiz
    if (currentQuestionIndex === quizList.length - 1) {
      // Show the results of the quiz
      // TODO: Implement the logic to show the results of the quiz
      setQuizList([])
    } else {
      // Go to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsWrongAnswer(false);
      // Reset the remaining time for the next question
      setRemainingTime(duration);
    }
  };

  return (
    <div>
      <h1>Quiz</h1>

      {remainingTime > 0 && (
        <div>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <h2>({remainingTime} seconds remaining)</h2>
          <Question
            question={quizList[currentQuestionIndex]}
            remainingTime={remainingTime}
            handleNextQuestion={handleNextQuestion}
            setIsWrongAnswer={setIsWrongAnswer}
          />

          <Button onClick={handleNextQuestion}>Next Question</Button>
        </div>
      )}

      {(remainingTime === 0 || isWrongAnswer) && (
        <div>
          <h2>
            Correct Answer: {quizList[currentQuestionIndex].correct_answer}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Quiz;
