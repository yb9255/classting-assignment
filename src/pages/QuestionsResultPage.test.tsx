import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { screen, waitFor } from '../utils/test/test-utils';
import QuestionsPage from './Questions';

import { decodeHtmlString } from '../utils';
import { InitialState } from '../redux/questions/types';
import { render } from '../utils/test/test-utils';
import userEvent from '@testing-library/user-event';
import QuestionsResultPage from './QuestionsResultPage';
import MainPage from './Main';

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

describe('QuestionResult', () => {
  it('moves to main page if there is no difference between start time and end time', () => {
    renderQuestionsResultPage({
      otherRoutes: [<Route path="/" key="/" element={<MainPage />} />],
    });

    const mainTitle = screen.getByRole('heading', { name: '영화 퀴즈' });
    expect(mainTitle).toBeInTheDocument();
  });

  it('shows 문제 결과 heading when quiz is over', async () => {
    const { getQuestionsResultHeading } = renderQuestionsResultPage({
      preloadedState: {
        questions: {
          startTime: 0,
          endTime: 500,
        },
      },
    });

    const questionsResultHeading = getQuestionsResultHeading();
    expect(questionsResultHeading).toBeInTheDocument();
  });

  it('shows spent time with mm:ss format', () => {
    const { getSpentTimeDiv } = renderQuestionsResultPage({
      preloadedState: {
        questions: {
          startTime: 0,
          endTime: 650000,
        },
      },
    });

    const spentTimeDiv = getSpentTimeDiv();
    expect(spentTimeDiv).toHaveTextContent('10:50');
  });

  it('shows how many rights and wrongs user got', async () => {
    const { getCorrectAnswerCountDiv, getWrongAnswerCountDiv } =
      renderQuestionsResultPage({
        preloadedState: {
          questions: {
            startTime: 0,
            endTime: 500,
            correctAnsweredQuestions: MOCK_CORRECT_ANSWERED_QUESTION_LIST,
            wrongAnsweredQuestions: MOCK_WRONG_ANSWERED_QUESTION_LIST,
          },
        },
      });

    const correctAnswerCountDiv = getCorrectAnswerCountDiv();
    const wrongAnswerCountDiv = getWrongAnswerCountDiv();

    expect(correctAnswerCountDiv).toHaveTextContent('1');
    expect(wrongAnswerCountDiv).toHaveTextContent('1');
  });

  it('returns home when click 돌아가기 button', async () => {
    const { getLinkToMainPage, waitForUserClick } = renderQuestionsResultPage({
      otherRoutes: [<Route path="/" key="/" element={<MainPage />} />],
      preloadedState: {
        questions: {
          startTime: 0,
          endTime: 650000,
        },
      },
    });

    const linkToMainPage = getLinkToMainPage();
    expect(linkToMainPage).toBeInTheDocument();

    await waitForUserClick(linkToMainPage);

    const mainTitle = await screen.findByRole('heading', { name: '영화 퀴즈' });
    expect(mainTitle).toBeInTheDocument();
  });

  it('resets the result when user leaves the page and shows new result when user solves quiz again', async () => {
    const {
      getCorrectAnswerCountDiv,
      getWrongAnswerCountDiv,
      getLinkToMainPage,
      waitForUserClick,
      solveQuizFromScratchWithAllCorrect,
    } = renderQuestionsResultPage({
      otherRoutes: [
        <Route path="/" key="/" element={<MainPage />} />,
        <Route
          path="/questions"
          key="/questions"
          element={<QuestionsPage />}
        />,
      ],
      preloadedState: {
        questions: {
          startTime: 0,
          endTime: 500,
          correctAnsweredQuestions: MOCK_CORRECT_ANSWERED_QUESTION_LIST,
          wrongAnsweredQuestions: MOCK_WRONG_ANSWERED_QUESTION_LIST,
        },
      },
    });

    const correctAnswerCountDiv = getCorrectAnswerCountDiv();
    const wrongAnswerCountDiv = getWrongAnswerCountDiv();

    expect(correctAnswerCountDiv).toHaveTextContent('1');
    expect(wrongAnswerCountDiv).toHaveTextContent('1');

    const linkToMainPage = getLinkToMainPage();

    expect(linkToMainPage).toBeInTheDocument();

    await waitForUserClick(linkToMainPage);
    await solveQuizFromScratchWithAllCorrect();

    const secondTestCorrectAnswerCountDiv = getCorrectAnswerCountDiv();
    const secondTestWrongAnswerCountDiv = getWrongAnswerCountDiv();

    expect(secondTestCorrectAnswerCountDiv).toHaveTextContent('2');
    expect(secondTestWrongAnswerCountDiv).toHaveTextContent('0');
  });
});

type Props = {
  initialEntries?: string[];
  otherRoutes?: React.ReactElement[];
  preloadedState?: { questions: Partial<InitialState> };
};

function renderQuestionsResultPage({
  initialEntries = ['/questions-result'],
  otherRoutes,
  preloadedState,
}: Props) {
  const user = userEvent.setup();

  render(
    <>
      <div id="overlay-root" />
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/questions-result" element={<QuestionsResultPage />} />
          {otherRoutes && otherRoutes.map((route) => route)}
        </Routes>
      </MemoryRouter>
    </>,
    { preloadedState }
  );

  const getQuestionsResultHeading = () =>
    screen.getByRole('heading', {
      name: '문제 결과',
    });

  const getSpentTimeDiv = () =>
    screen.getByText('소요 시간:', { exact: false });

  const getCorrectAnswerCountDiv = () =>
    screen.getByText('정답 수:', {
      exact: false,
    });

  const getWrongAnswerCountDiv = () =>
    screen.getByText('오답 수: ', {
      exact: false,
    });

  const getLinkToMainPage = () =>
    screen.getByRole('link', { name: '돌아가기' });

  const waitForUserClick = async (targetElement: Element) => {
    await waitFor(async () => {
      await user.click(targetElement);
    });
  };

  const solveQuizFromScratchWithAllCorrect = async () => {
    const mainPageStartLink = screen.getByRole('link', { name: '퀴즈 풀기' });

    await waitForUserClick(mainPageStartLink);

    const correctAnswer = await screen.findByText(
      decodeHtmlString('The Lead Programmer&#039;s birthday')
    );

    await waitForUserClick(correctAnswer);

    const correctModal = await screen.findByText('정답입니다!', {
      exact: false,
    });

    const nextBtn = await screen.findByRole('button', {
      name: '다음',
    });

    expect(correctModal).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    await waitForUserClick(nextBtn);

    const secondQuestionCorrectAnswer = await screen.findByText(
      decodeHtmlString('Hurt')
    );

    expect(secondQuestionCorrectAnswer).toBeInTheDocument();

    await waitForUserClick(secondQuestionCorrectAnswer);

    const secondQuestionCorrectModal = await screen.findByText('정답입니다!', {
      exact: false,
    });

    const secondQuestionNextBtn = await screen.findByRole('button', {
      name: '다음',
    });

    expect(secondQuestionCorrectModal).toBeInTheDocument();
    expect(secondQuestionNextBtn).toBeInTheDocument();

    await waitForUserClick(secondQuestionNextBtn);
  };

  return {
    getQuestionsResultHeading,
    getSpentTimeDiv,
    getCorrectAnswerCountDiv,
    getWrongAnswerCountDiv,
    getLinkToMainPage,
    waitForUserClick,
    solveQuizFromScratchWithAllCorrect,
  };
}
