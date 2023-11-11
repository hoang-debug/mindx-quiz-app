import logo from './logo.svg';
import './App.css';
import QuizConfiguration from './QuizConfiguration/QuizConfiguration';
import { useState } from 'react';
import Quiz from './Quiz/Quiz';
import { Spin } from 'antd';

function App() {
  const [duration, setDuration] = useState(0);
  const [quizList, setQuizList] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <div className="App">
      <Spin spinning={loading}>

      {quizList.length <= 0 && <QuizConfiguration setDuration={setDuration} setQuizList={setQuizList} setLoading={setLoading}/>}
      {quizList.length > 0 && <Quiz quizList={quizList} duration={duration} setQuizList={setQuizList}/>}
      </Spin>
    
    </div>
  );
}

export default App;
