import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage, QuestionsPage, WrongAnsweredQuestionsPage } from './pages';
import QuestionsResultPage from './pages/QuestionsResultPage';
import { Layout } from './components';
import { useLocation } from 'react-router-dom';

function App() {
  const { pathname } = useLocation();
  const layoutType = pathname === '/' ? 'main' : 'default';

  return (
    <Layout layoutType={layoutType}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/questions-result" element={<QuestionsResultPage />} />
        <Route
          path="/wrong-answered-questions"
          element={<WrongAnsweredQuestionsPage />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
