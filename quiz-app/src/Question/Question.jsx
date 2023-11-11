import React, { useEffect, useState } from "react";
import { Radio, Button, Row, Col, message } from "antd";

const Question = ({ question, remainingTime, handleNextQuestion, setIsWrongAnswer }) => {
  const [questionList, setQuestionList] = useState(shuffleArray([...question.incorrect_answers, question.correct_answer]));
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Correct answer',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Incorrect answer :(',
    });
  };
  if (remainingTime === 0) {
    setQuestionList([question.correct_answer]);
  }

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
    }
    return shuffledArray;
  }
  useEffect(() => {
    setQuestionList(shuffleArray([...question.incorrect_answers, question.correct_answer]));
  }, [question]);

  const handleSubmit = () => {
    if (selectedAnswer === question.correct_answer) {
        success();
        handleNextQuestion();
    } else {
        error()
      setIsWrongAnswer(true);
    }
  };

  const handleChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  return (
    <div>
      <p>{question.question}</p>

      {question.type === "multiple" && (
        <Radio.Group value={selectedAnswer} onChange={handleChange}>
          {(questionList).map((answer, index) => (
            <Radio key={index} value={answer}>
              {answer}
            </Radio>
          ))}
        </Radio.Group>
      )}
{contextHolder}

      {question.type === "boolean" && (
        <Radio.Group value={selectedAnswer} onChange={handleChange}>
          <Radio value="True">True</Radio>
          <Radio value="False">False</Radio>
        </Radio.Group>
      )}
<Row>
<Col span={12} offset={6}>
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
      </Col>
</Row>
    </div>
  );
};

export default Question;
