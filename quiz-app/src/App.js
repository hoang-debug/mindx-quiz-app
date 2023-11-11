import logo from './logo.svg';
import './App.css';
import QuizConfiguration from './QuizConfiguration/QuizConfiguration';
import { useState } from 'react';
import Quiz from './Quiz/Quiz';

function App() {
  const [duration, setDuration] = useState(0);
  const [quizList, setQuizList] = useState([]);

  console.log(duration, "duration")
  return (
    <div className="App">
      {quizList.length <= 0 && <QuizConfiguration setDuration={setDuration} setQuizList={setQuizList}/>}
      {quizList.length > 0 && <Quiz quizList={quizList} duration={duration} setQuizList={setQuizList}/>}
    </div>
  );
}

export default App;
