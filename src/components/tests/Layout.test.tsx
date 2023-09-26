import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { screen, render, waitFor } from '../../utils/test/test-utils';
import { WrongAnsweredQuestionsPage } from '../../pages/WrongAnsweredQuestionsPage';
import MainPage from '../../pages/MainPage';
import userEvent from '@testing-library/user-event';
import { QuestionsPage } from '../../pages/QuestionsPage';
import Layout from '../Layout';

describe('Layout', () => {
  const user = userEvent.setup();

  it('moves to home page when click 홈', async () => {
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

  it('moves to WrongAnsweredQuestionsPage when click 오답 노트', async () => {
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

  it("doesn't show navbar when the route is /", () => {
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
