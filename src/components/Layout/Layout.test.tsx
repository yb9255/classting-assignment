import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { screen, render, waitFor } from '../../utils/test/test-utils';
import WrongAnsweredQuestionsPage from '../../pages/WrongAnsweredQuestions';
import MainPage from '../../pages/Main';
import userEvent from '@testing-library/user-event';
import QuestionsPage from '../../pages/Questions';
import Layout from './Layout';

describe('Layout', () => {
  it('상단 네비게이션 바의 홈 버튼을 누를 경우, 홈으로 이동한다.', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/wrong-answered-questions']}>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/wrong-answered-questions"
              element={<WrongAnsweredQuestionsPage />}
            />
          </Routes>
        </Layout>
      </MemoryRouter>
    );

    const wrongAnsweredQuestionsPageTitle = screen.getByRole('heading', {
      name: '오답 노트',
    });

    expect(wrongAnsweredQuestionsPageTitle).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: '홈' });
    expect(homeLink).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(homeLink);
    });

    const mainTitle = screen.getByRole('heading', { name: '영화 퀴즈' });
    expect(mainTitle).toBeInTheDocument();
  });

  it("상단 네비게이션 바의 '오답 노트' 버튼을 누를 경우 오답 노트 페이지로 이동한다.", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/questions']}>
        <Layout>
          <Routes>
            <Route path="/questions" element={<QuestionsPage />} />
            <Route
              path="/wrong-answered-questions"
              element={<WrongAnsweredQuestionsPage />}
            />
          </Routes>
        </Layout>
      </MemoryRouter>
    );

    const wrongAnsweredQuestionsPageLink = screen.getByRole('link', {
      name: '오답 노트',
    });

    expect(wrongAnsweredQuestionsPageLink).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(wrongAnsweredQuestionsPageLink);
    });

    const wrongAnsweredQuestionsPageTitle = screen.getByRole('heading', {
      name: '오답 노트',
    });

    expect(wrongAnsweredQuestionsPageTitle).toBeInTheDocument();
  });

  it('메인 페이지에 있을 경우 네비게이션 바가 보이지 않는다.', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Layout layoutType="main">
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Layout>
      </MemoryRouter>
    );
  });

  const homeLink = screen.queryByRole('link', { name: '홈' });

  const wrongAnsweredQuestionsPageLink = screen.queryByRole('link', {
    name: '오답 노트',
  });

  expect(homeLink).not.toBeInTheDocument();
  expect(wrongAnsweredQuestionsPageLink).not.toBeInTheDocument();
});
