import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, waitFor } from '../utils/test/test-utils';

import { LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID } from '../constants';
import MainPage from './MainPage';
import {
  getMockClient400Error,
  getMockServer500Error,
  getMockEmptyData,
} from '../utils/test/msw/utils';

import type { WrongAnsweredQuestionType } from './WrongAnsweredQuestionsPage';
import userEvent from '@testing-library/user-event';
import { decodeHtmlString } from '../utils';
import QuestionsPage from './QuestionsPage';

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

  it('shows how many questions are passed and left', async () => {
    const {
      findCorrectAnswerOfFirstQuestionLi,
      findNextButton,
      findProgressOnFirstQuestionDiv,
      findProgressOnSecondQuestionDiv,
      waitForUserClick,
    } = renderQuestionsPage();

    const progressOnFirstQuestionDiv = await findProgressOnFirstQuestionDiv();
    expect(progressOnFirstQuestionDiv).toBeInTheDocument();

    const correctAnswerOfFirstQuestionLi =
      await findCorrectAnswerOfFirstQuestionLi();
    await waitForUserClick(correctAnswerOfFirstQuestionLi);

    const nextButton = await findNextButton();
    await waitForUserClick(nextButton);

    const progessOnSecondQuestionDiv = await findProgressOnSecondQuestionDiv();
    expect(progessOnSecondQuestionDiv).toBeInTheDocument();
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

type Props = {
  initialEntries?: string[];
  otherRoutes?: React.ReactElement[];
};

function renderQuestionsPage({
  initialEntries = ['/questions'],
  otherRoutes,
}: Props = {}) {
  const user = userEvent.setup();

  const titleOfFirstQuestion = decodeHtmlString(
    'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
  );

  const titleOfSecondQuestion = decodeHtmlString(
    'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
  );

  const correctAnswerOfFirstQuestion = decodeHtmlString(
    'The Lead Programmer&#039;s birthday'
  );

  const wrongAnswerOfFirstQuestion = decodeHtmlString(
    'The first release date of &quot;Sonic the Hedgehog&quot;'
  );

  const mockProgressTextOnFirstQuestion = '1 / 2';
  const mockProgressTextOnSecondQuestion = '2 / 2';

  render(
    <>
      <div id="overlay-root" />
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/questions" element={<QuestionsPage />} />
          {otherRoutes && otherRoutes.map((route) => route)}
        </Routes>
      </MemoryRouter>
    </>
  );

  const getLoadingDiv = () => screen.getByTestId('loading-spinner');

  const findFirstQuestionTitleHeading = () =>
    screen.findByText(titleOfFirstQuestion, {
      exact: false,
    });

  const findAnswerList = () => screen.findAllByRole('listitem');

  const findCorrectAnswerOfFirstQuestionLi = () =>
    screen.findByText(correctAnswerOfFirstQuestion);

  const findWrongAnswerOfFirstQuestionLi = () =>
    screen.findByText(wrongAnswerOfFirstQuestion);

  const findCorrectAnswerModal = () =>
    screen.findByText('정답입니다!', {
      exact: false,
    });

  const findWrongAnswerModal = () =>
    screen.findByText('틀렸습니다!', {
      exact: false,
    });

  const findCorrectAnswerInWrongAnswerModalDiv = () =>
    screen.findByText(`정답: ${correctAnswerOfFirstQuestion}`, {
      exact: false,
    });

  const findNextButton = () => screen.findByRole('button', { name: '다음' });

  const findSecondQuestionTitleHeading = () =>
    screen.findByText(titleOfSecondQuestion, {
      exact: false,
    });

  const findErrorHeading = () =>
    screen.findByRole('heading', {
      name: /ERROR/i,
    });

  const findEmptyQuestionPageHeading = () =>
    screen.findByRole('heading', {
      name: '해당하는 문제가 없습니다.',
      exact: false,
    });

  const findBackLink = () =>
    screen.findByRole('link', {
      name: '돌아가기',
    });

  const findProgressOnFirstQuestionDiv = () =>
    screen.findByText(mockProgressTextOnFirstQuestion);
  const findProgressOnSecondQuestionDiv = () =>
    screen.findByText(mockProgressTextOnSecondQuestion);

  const waitForUserClick = async (targetElement: Element) => {
    await waitFor(async () => {
      await user.click(targetElement);
    });
  };

  return {
    correctAnswerOfFirstQuestion,
    wrongAnswerOfFirstQuestion,
    getLoadingDiv,
    findFirstQuestionTitleHeading,
    findAnswerList,
    findCorrectAnswerOfFirstQuestionLi,
    findWrongAnswerOfFirstQuestionLi,
    findCorrectAnswerModal,
    findWrongAnswerModal,
    findCorrectAnswerInWrongAnswerModalDiv,
    findNextButton,
    findSecondQuestionTitleHeading,
    findErrorHeading,
    findEmptyQuestionPageHeading,
    findBackLink,
    findProgressOnFirstQuestionDiv,
    findProgressOnSecondQuestionDiv,
    waitForUserClick,
  };
}
