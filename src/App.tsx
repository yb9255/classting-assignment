import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import QuestionPage from './pages/QuestionPage';
import QuestionsResultPage from './pages/QuestionsResultPage';
import WrongAnsweredQuestionsPage from './pages/WrongAnsweredQuestionsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/questions" element={<QuestionPage />} />
      <Route path="/questions-result" element={<QuestionsResultPage />} />
      <Route
        path="/wrong-answered-questions"
        element={<WrongAnsweredQuestionsPage />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
