import { Navigate, Route, Routes } from 'react-router-dom';
import {
  Main,
  Questions,
  QuestionsResult,
  WrongAnsweredQuestions,
} from './pages';
import { Layout } from './components';
import { useLocation } from 'react-router-dom';

function App() {
  const { pathname } = useLocation();
  const layoutType = pathname === '/' ? 'main' : 'default';

  return (
    <Layout layoutType={layoutType}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/questions-result" element={<QuestionsResult />} />
        <Route
          path="/wrong-answered-questions"
          element={<WrongAnsweredQuestions />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
