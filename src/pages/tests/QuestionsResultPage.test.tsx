import { Route } from 'react-router-dom';
import { screen } from '../../test-utils';
import QuestionsPage from '../QuestionsPage';
import MainPage from '../MainPage';
import { renderQuestionsResultPage } from './helpers';
import {
  MOCK_CORRECT_ANSWERED_QUESTION_LIST,
  MOCK_WRONG_ANSWERED_QUESTION_LIST,
} from './mocks';

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
