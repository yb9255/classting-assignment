import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import QuestionPage from './pages/QuestionPage';
import QuestionsResultPage from './pages/QuestionsResultPage';
import WrongQuestionsPage from './pages/WrongQuestionsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/questions/:questionId" element={<QuestionPage />} />
      <Route path="/questions-result" element={<QuestionsResultPage />} />
      <Route path="/wrong-questions" element={<WrongQuestionsPage />} />
    </Routes>
  );
}

export default App;
