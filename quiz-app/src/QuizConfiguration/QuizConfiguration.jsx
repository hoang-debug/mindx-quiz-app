import { useEffect, useState } from "react";
import { Button, Form, InputNumber, Select } from "antd";
import axios from "axios";
import "./QuizConfiguration.css";

const QuizConfiguration = ({setDuration, setQuizList}) => {
  const [quizConfiguration, setQuizConfiguration] = useState({
    category: "",
    difficulty: "",
    questionType: "",
    amount: 10,
    duration: 10,
  });
  const [categories, setCategories] = useState([]);

  const typeData = [
    { label: "True/False", value: "boolean" },
    { label: "Multiple Choice", value: "multiple" },
  ];
  const difficultyData = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("https://opentdb.com/api_category.php");
      const categories = response.data.trivia_categories;

      return categories;
    };

    fetchCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);
console.log(categories, "categories");

const handleSubmit = async () => {
    setDuration(quizConfiguration.duration);
    // Fetch the quiz questions from the Open Trivia DB API
    const response = await axios.get('https://opentdb.com/api.php', {
      params: {
        amount: quizConfiguration.amount,
        category: quizConfiguration.category,
        difficulty: quizConfiguration.difficulty,
        type: quizConfiguration.questionType,
      },
    });
  
    // Check if the quiz questions were fetched successfully
    if (response.status === 200) {
      // Start the quiz
      // TODO: Implement the quiz logic here
      setQuizList(response.data.results);
    } else {
      // Show an error message to the user
      console.log('Error fetching quiz questions');
    }
  };
  

  return (
    <Form onFinish={handleSubmit} className="quiz-configuration-form" layout="vertical">
      <Form.Item label="Category" name="category">
        <Select
          value={quizConfiguration.category}
          onChange={(e) =>
            setQuizConfiguration({
              ...quizConfiguration,
              category: e,
            })
          }
          placeholder="Select Category"
        >
          {categories.map((category) => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Difficulty" name="difficulty">
        <Select
          value={quizConfiguration.difficulty}
          onChange={(e) =>
            setQuizConfiguration({ ...quizConfiguration, difficulty: e })
          }
          placeholder="Select Difficulty"
        >
          {difficultyData.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
          {/* List of difficulties */}
        </Select>
      </Form.Item>

      <Form.Item label="Question Type" name="questionType">
        <Select
          value={quizConfiguration.questionType}
          onChange={(e) =>
            setQuizConfiguration({ ...quizConfiguration, questionType: e })
          }
          placeholder="Select Question Type"

        >
          {typeData.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Amount" name="amount">
        <InputNumber
          type="number"
          value={quizConfiguration.amount}
          onChange={(value) =>
            setQuizConfiguration({ ...quizConfiguration, amount: value })
          }
          placeholder="Amount"
        />
      </Form.Item>

      <Form.Item label="Duration (in seconds)" name="duration">
    <InputNumber
      type="number"
      value={quizConfiguration.duration}
      onChange={(value) =>
        setQuizConfiguration({ ...quizConfiguration, duration: value })
      }
      min={1}
      max={100}
      placeholder="Duration"

    />
  </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" size="large">Start Quiz</Button>
      </Form.Item>
    </Form>
  );
};

export default QuizConfiguration;
