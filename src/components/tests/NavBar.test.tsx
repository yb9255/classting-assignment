import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { screen, render, waitFor } from '../../test-utils';
import WrongAnsweredQuestionsPage from '../../pages/WrongAnsweredQuestionsPage';
import MainPage from '../../pages/MainPage';
import NavBar from '../NavBar';
import userEvent from '@testing-library/user-event';
import QuestionPage from '../../pages/QuestionPage';

describe('NavBar', () => {
  const user = userEvent.setup();

  it('moves to home page when click 홈', async () => {
    render(
      <MemoryRouter initialEntries={['/wrong-answered-questions']}>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    const wrongAnsweredQuestionPageTitle = screen.getByRole('heading', {
      name: '오답 노트',
    });

    expect(wrongAnsweredQuestionPageTitle).toBeInTheDocument();

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
        <NavBar />
        <Routes>
          <Route path="/questions" element={<QuestionPage />} />
          <Route
            path="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />
        </Routes>
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
});
