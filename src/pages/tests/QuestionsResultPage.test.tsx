import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { screen, render, waitFor } from '../../test-utils';
import QuestionsResultPage from '../QuestionsResultPage';
import QuestionsPage from '../QuestionsPage';
import { decodeHtmlString } from '../../helpers';
import userEvent from '@testing-library/user-event';
import MainPage from '../MainPage';

describe('QuestionResult', () => {
  const user = userEvent.setup();

  const MOCK_CORRECT_ANSWERED_QUESTION_LIST = [
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'hard',
      question: decodeHtmlString(
        'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
      ),
      correctAnswer: decodeHtmlString('The Lead Programmer&#039;s birthday'),
      answers: [
        decodeHtmlString(
          'The first release date of &quot;Sonic the Hedgehog&quot;'
        ),
        decodeHtmlString('The date Sonic Team was founded'),
        decodeHtmlString(
          'The first release date of &quot;Sonic the Hedgehog 2&quot;'
        ),
        decodeHtmlString('The Lead Programmer&#039;s birthday'),
      ],
    },
  ];

  const MOCK_WRONG_ANSWERED_QUESTION_LIST = [
    {
      category: 'Entertainment: Music',
      type: 'multiple',
      difficulty: 'medium',
      question: decodeHtmlString(
        'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
      ),
      correctAnswer: 'Hurt',
      answers: ['Closer', 'A Warm Place', 'Big Man with a Gun'],
    },
  ];

  it('moves to main page if there is no difference between start time and end time', () => {
    render(
      <MemoryRouter initialEntries={['/questions-result']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/questions-result" element={<QuestionsResultPage />} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          questions: {
            startTime: 0,
            endTime: 0,
          },
        },
      }
    );

    const mainTitle = screen.getByRole('heading', { name: '영화 퀴즈' });
    expect(mainTitle).toBeInTheDocument();
  });

  it('shows 문제 결과 heading when quiz is over', async () => {
    render(
      <MemoryRouter initialEntries={['/questions-result']}>
        <Routes>
          <Route path="/questions-result" element={<QuestionsResultPage />} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          questions: {
            startTime: 0,
            endTime: 500,
          },
        },
      }
    );

    const questionResultHeading = screen.getByRole('heading', {
      name: '문제 결과',
    });

    expect(questionResultHeading).toBeInTheDocument();
  });

  it('shows spent time with mm:ss format', () => {
    render(
      <MemoryRouter initialEntries={['/questions-result']}>
        <Routes>
          <Route path="/questions-result" element={<QuestionsResultPage />} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          questions: {
            startTime: 0,
            endTime: 650000,
          },
        },
      }
    );

    const spentTimeDiv = screen.getByText('소요 시간:', { exact: false });
    expect(spentTimeDiv).toHaveTextContent('10:50');
  });

  it('shows how many rights and wrongs user got', async () => {
    render(
      <MemoryRouter initialEntries={['/questions-result']}>
        <Routes>
          <Route path="/questions-result" element={<QuestionsResultPage />} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          questions: {
            startTime: 0,
            endTime: 500,
            correctAnsweredQuestions: MOCK_CORRECT_ANSWERED_QUESTION_LIST,
            wrongAnsweredQuestions: MOCK_WRONG_ANSWERED_QUESTION_LIST,
          },
        },
      }
    );

    const correctAnswerCountDiv = screen.getByText('정답 수:', {
      exact: false,
    });

    const wrongAnswerCountDiv = screen.getByText('오답 수: ', {
      exact: false,
    });

    expect(correctAnswerCountDiv).toHaveTextContent('1');
    expect(wrongAnswerCountDiv).toHaveTextContent('1');
  });

  it('returns home when click 돌아가기 button', async () => {
    render(
      <MemoryRouter initialEntries={['/questions-result']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/questions-result" element={<QuestionsResultPage />} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          questions: {
            startTime: 0,
            endTime: 650000,
          },
        },
      }
    );

    const backButton = screen.getByRole('link', { name: '돌아가기' });
    expect(backButton).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(backButton);
    });

    const mainTitle = await screen.findByRole('heading', { name: '영화 퀴즈' });
    expect(mainTitle).toBeInTheDocument();
  });

  it('reset the result when it is unmounted', async () => {
    render(
      <>
        <div id="overlay-root" />
        <MemoryRouter initialEntries={['/questions-result']}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/questions-result" element={<QuestionsResultPage />} />
          </Routes>
        </MemoryRouter>
      </>,
      {
        preloadedState: {
          questions: {
            startTime: 0,
            endTime: 500,
            correctAnsweredQuestions: MOCK_CORRECT_ANSWERED_QUESTION_LIST,
            wrongAnsweredQuestions: MOCK_WRONG_ANSWERED_QUESTION_LIST,
          },
        },
      }
    );

    const correctAnswerCountDiv = screen.getByText('정답 수:', {
      exact: false,
    });

    const wrongAnswerCountDiv = screen.getByText('오답 수: ', {
      exact: false,
    });

    expect(correctAnswerCountDiv).toHaveTextContent('1');
    expect(wrongAnswerCountDiv).toHaveTextContent('1');

    const backButton = screen.getByRole('link', { name: '돌아가기' });
    expect(backButton).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(backButton);
    });

    const mainButton = screen.getByRole('link', { name: '퀴즈 풀기' });

    await waitFor(async () => {
      await user.click(mainButton);
    });

    const secondTestCorrectAnswer = await screen.findByText(
      decodeHtmlString('The Lead Programmer&#039;s birthday')
    );

    await waitFor(async () => {
      await user.click(secondTestCorrectAnswer);
    });

    const secondTestMessageModal = await screen.findByText('정답입니다!', {
      exact: false,
    });

    const secondTestNextBtn = await screen.findByRole('button', {
      name: '다음',
    });

    expect(secondTestMessageModal).toBeInTheDocument();
    expect(secondTestNextBtn).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(secondTestNextBtn);
    });

    const secondNextQuestionCorrectAnswer = await screen.findByText(
      decodeHtmlString('Hurt')
    );

    expect(secondNextQuestionCorrectAnswer).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(secondNextQuestionCorrectAnswer);
    });

    const secondNextQuestionMessageModal = await screen.findByText(
      '정답입니다!',
      {
        exact: false,
      }
    );

    const secondNextQuestionNextBtn = await screen.findByRole('button', {
      name: '다음',
    });

    expect(secondNextQuestionMessageModal).toBeInTheDocument();
    expect(secondNextQuestionNextBtn).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(secondNextQuestionNextBtn);
    });

    const secondTestCorrectAnswerCountDiv = screen.getByText('정답 수:', {
      exact: false,
    });

    const secondTestWrongAnswerCountDiv = screen.getByText('오답 수: ', {
      exact: false,
    });

    expect(secondTestCorrectAnswerCountDiv).toHaveTextContent('2');
    expect(secondTestWrongAnswerCountDiv).toHaveTextContent('0');
  });
});
