import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { decodeHtmlString } from '../../helpers';
import { screen, render, waitFor } from '../../test-utils';
import WrongAnsweredQuestionsPage from '../WrongAnsweredQuestionsPage';
import {
  longTestWrongAnsweredQuestions,
  shortTestWrongAnsweredQuestions,
} from './mocks';
import userEvent from '@testing-library/user-event';
import { LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID } from '../../constants';

describe('WrongAnsweredQuestionsPage', () => {
  const user = userEvent.setup();
  window.scrollTo = jest.fn();

  beforeEach(() => {
    localStorage.setItem(
      LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID,
      JSON.stringify(shortTestWrongAnsweredQuestions)
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('shows wrong questions title', () => {
    render(
      <MemoryRouter initialEntries={['/wrong-answered-questions']}>
        <Routes>
          <Route
            path="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    const pageTitle = screen.getByRole('heading', { name: '오답 노트' });

    expect(pageTitle).toBeInTheDocument();
  });

  it('shows all wrong questions in history', () => {
    render(
      <MemoryRouter initialEntries={['/wrong-answered-questions']}>
        <Routes>
          <Route
            path="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    const firstQuestionTitleDiv = screen.getByText(
      decodeHtmlString(
        'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
      ),
      { exact: false }
    );

    const secondQuestionTitleDiv = screen.getByText(
      decodeHtmlString(
        'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
      ),
      { exact: false }
    );

    expect(firstQuestionTitleDiv).toBeInTheDocument();
    expect(secondQuestionTitleDiv).toBeInTheDocument();
  });

  it('shows chosen answer that was wrong', () => {
    render(
      <MemoryRouter initialEntries={['/wrong-answered-questions']}>
        <Routes>
          <Route
            path="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    const chosenAnswerDiv = screen.getByText(
      `선택한 오답: ${decodeHtmlString('Closer')}`
    );

    expect(chosenAnswerDiv).toBeInTheDocument();
  });

  it('shows correct answer that was not chosen', () => {
    render(
      <MemoryRouter initialEntries={['/wrong-answered-questions']}>
        <Routes>
          <Route
            path="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    const correctAnswerDiv = screen.getByText(
      `정답: ${decodeHtmlString('Hurt')}`
    );

    expect(correctAnswerDiv).toBeInTheDocument();
  });

  it('shows list of answers', () => {
    const TOTAL_LIST_ITEMS_OF_ALL_WRONG_QUESTIONS = 8;

    render(
      <MemoryRouter initialEntries={['/wrong-answered-questions']}>
        <Routes>
          <Route
            path="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    const totalAnswersList = screen.getAllByRole('listitem');
    expect(totalAnswersList).toHaveLength(
      TOTAL_LIST_ITEMS_OF_ALL_WRONG_QUESTIONS
    );
  });

  it('shows there is no wrong answered questions in history', () => {
    localStorage.clear();

    render(
      <MemoryRouter initialEntries={['/wrong-answered-questions']}>
        <Routes>
          <Route
            path="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    const noWrongAnsweredQuestionHeading = screen.getByRole('heading', {
      name: '오답 기록이 없습니다.',
    });

    expect(noWrongAnsweredQuestionHeading).toBeInTheDocument();
  });

  it('shows only 5 question per page', () => {
    localStorage.setItem(
      LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID,
      JSON.stringify(longTestWrongAnsweredQuestions)
    );

    render(
      <MemoryRouter initialEntries={['/wrong-answered-questions']}>
        <Routes>
          <Route
            path="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    const wrongAnsweredQuestionTitleList = screen.getAllByText('문제', {
      exact: false,
    });

    expect(wrongAnsweredQuestionTitleList).toHaveLength(5);
  });

  it('change page and card based on pagination when click pagination btn', async () => {
    localStorage.setItem(
      LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID,
      JSON.stringify(longTestWrongAnsweredQuestions)
    );

    render(
      <MemoryRouter initialEntries={['/wrong-answered-questions']}>
        <Routes>
          <Route
            path="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    const prevButton = screen.getByRole('button', { name: '<' });
    const nextButton = screen.getByRole('button', { name: '>' });

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(nextButton);
    });

    const wrongAnsweredQuestionTitleListOnSecondPage =
      await screen.findAllByText('문제', {
        exact: false,
      });

    expect(wrongAnsweredQuestionTitleListOnSecondPage).toHaveLength(2);

    await waitFor(async () => {
      await user.click(nextButton);
    });

    const wrongAnsweredQuestionTitleListOnSecondPage2 =
      await screen.findAllByText('문제', {
        exact: false,
      });

    expect(wrongAnsweredQuestionTitleListOnSecondPage2).toHaveLength(2);

    await waitFor(async () => {
      await user.click(prevButton);
    });

    const wrongAnswerQuestionTitleListOnFirstPage = await screen.findAllByText(
      '문제',
      {
        exact: false,
      }
    );

    expect(wrongAnswerQuestionTitleListOnFirstPage).toHaveLength(5);

    await waitFor(async () => {
      await user.click(prevButton);
    });

    const wrongAnswerQuestionTitleListOnFirstPage2 = await screen.findAllByText(
      '문제',
      {
        exact: false,
      }
    );

    expect(wrongAnswerQuestionTitleListOnFirstPage2).toHaveLength(5);
  });
});
