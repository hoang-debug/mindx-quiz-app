import logo from './logo.svg';
import './App.css';
import QuizConfiguration from './QuizConfiguration/QuizConfiguration';
import { useState } from 'react';
import CountdownTimer from './CountdownTimer/CountdownTimer';
import Quiz from './Quiz/Quiz';

function App() {
  const [duration, setDuration] = useState(0);
  const [quizList, setQuizList] = useState([]);

  console.log(duration, "duration")
  return (
    <div className="App">
      {quizList.length <= 0 && <QuizConfiguration setDuration={setDuration} setQuizList={setQuizList}/>}
      {/* <CountdownTimer duration={duration}/> */}
      {quizList.length > 0 && <Quiz quizList={quizList} duration={duration}/>}
    </div>
  );
}

export default App;
