import { Route } from 'react-router-dom';
import { screen } from '../../test-utils';

import { LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID } from '../../constants';
import MainPage from '../MainPage';
import { WrongAnsweredQuestionType } from '../WrongAnsweredQuestionsPage';
import { renderQuestionsPage } from './helpers';
import {
  getMockClient400Error,
  getMockServer500Error,
  getMockEmptyData,
} from '../../msw/helpers';

describe('QuestionsPage', () => {
  afterAll(() => localStorage.clear());

  it('shows loading before question is rendered', () => {
    const { getLoadingDiv } = renderQuestionsPage();
    const loadingDiv = getLoadingDiv();

    expect(loadingDiv).toBeInTheDocument();
  });

  it('shows question title as heading', async () => {
    const { findFirstQuestionTitleHeading } = renderQuestionsPage();

    const firstQuestionTitleHeading = await findFirstQuestionTitleHeading();
    expect(firstQuestionTitleHeading).toBeInTheDocument();
  });

  it('shows 4 choices', async () => {
    const { findAnswerList } = renderQuestionsPage();

    const listItems = await findAnswerList();
    expect(listItems).toHaveLength(4);
  });

  it("shows message '정답입니다!' when the answer is correct", async () => {
    const {
      findCorrectAnswerOfFirstQuestionLi,
      findCorrectAnswerModal,
      findNextButton,
      findSecondQuestionTitleHeading,
      waitForUserClick,
    } = renderQuestionsPage();

    const correctAnswerLi = await findCorrectAnswerOfFirstQuestionLi();

    await waitForUserClick(correctAnswerLi);

    const messageModal = await findCorrectAnswerModal();
    const nextBtn = await findNextButton();

    expect(messageModal).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    await waitForUserClick(nextBtn);

    const secondQuestionTitleHeading = await findSecondQuestionTitleHeading();

    expect(secondQuestionTitleHeading).toBeInTheDocument();
  });

  it("shows message '틀렸습니다!' and correct answer when the answer is wrong", async () => {
    const {
      findWrongAnswerOfFirstQuestionLi,
      findWrongAnswerModal,
      findCorrectAnswerInWrongAnswerModalDiv,
      findSecondQuestionTitleHeading,
      findNextButton,
      waitForUserClick,
    } = renderQuestionsPage();

    const wrongAnswerLi = await findWrongAnswerOfFirstQuestionLi();

    await waitForUserClick(wrongAnswerLi);

    const wrongAnswerModal = await findWrongAnswerModal();

    const correctAnswerInWrongAnswerModalDiv =
      await findCorrectAnswerInWrongAnswerModalDiv();

    const nextBtn = await findNextButton();

    expect(wrongAnswerModal).toBeInTheDocument();
    expect(correctAnswerInWrongAnswerModalDiv).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    await waitForUserClick(nextBtn);

    const secondQuestionTitleHeading = await findSecondQuestionTitleHeading();
    expect(secondQuestionTitleHeading).toBeInTheDocument();
  });

  it('shows error message when wrong request occurred', async () => {
    getMockClient400Error();

    const { findErrorHeading, findBackLink, waitForUserClick } =
      renderQuestionsPage({
        otherRoutes: [<Route path="/" key="/" element={<MainPage />} />],
      });

    const errorHeading = await findErrorHeading();
    const backLink = await findBackLink();

    expect(errorHeading).toBeInTheDocument();
    expect(backLink).toBeInTheDocument();

    await waitForUserClick(backLink);

    const mainPageTitle = screen.getByRole('heading', { name: '영화 퀴즈' });
    expect(mainPageTitle).toBeInTheDocument();
  });

  it('shows error message when server error occurred', async () => {
    getMockServer500Error();

    const { findErrorHeading, findBackLink, waitForUserClick } =
      renderQuestionsPage({
        otherRoutes: [<Route path="/" key="/" element={<MainPage />} />],
      });

    const errorHeading = await findErrorHeading();
    const backLink = await findBackLink();

    expect(errorHeading).toBeInTheDocument();
    expect(backLink).toBeInTheDocument();

    await waitForUserClick(backLink);

    const mainTitle = screen.queryByRole('heading', { name: '영화 퀴즈' });
    expect(mainTitle).toBeInTheDocument();
  });

  it('shows 해당하는 문제가 없습니다. message when there is no error and result', async () => {
    getMockEmptyData();

    const { findEmptyQuestionPageHeading, findBackLink, waitForUserClick } =
      renderQuestionsPage({
        otherRoutes: [<Route path="/" key="/" element={<MainPage />} />],
      });

    const emptyQuestionPageHeading = await findEmptyQuestionPageHeading();
    const backLink = await findBackLink();

    expect(emptyQuestionPageHeading).toBeInTheDocument();
    expect(backLink).toBeInTheDocument();

    await waitForUserClick(backLink);

    const mainPageTitle = screen.getByRole('heading', { name: '영화 퀴즈' });
    expect(mainPageTitle).toBeInTheDocument();
  });

  it('save wrong answered question in localStorage', async () => {
    const {
      correctAnswerOfFirstQuestion,
      wrongAnswerOfFirstQuestion,
      findWrongAnswerOfFirstQuestionLi,
      waitForUserClick,
    } = renderQuestionsPage();

    const wrongAnswerOfFirstQuestionLi =
      await findWrongAnswerOfFirstQuestionLi();

    expect(wrongAnswerOfFirstQuestionLi).toBeInTheDocument();

    await waitForUserClick(wrongAnswerOfFirstQuestionLi);

    const wrongAnsweredQuestionData = localStorage.getItem(
      LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID
    );

    const wrongAnsweredQuestionsHistory: WrongAnsweredQuestionType[] =
      wrongAnsweredQuestionData ? JSON.parse(wrongAnsweredQuestionData) : [];

    expect(wrongAnsweredQuestionsHistory[0].correctAnswer).toBe(
      correctAnswerOfFirstQuestion
    );

    expect(wrongAnsweredQuestionsHistory[0].chosenAnswer).toBe(
      wrongAnswerOfFirstQuestion
    );
  });
});
