import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, waitFor } from '../utils/test/test-utils';

import { LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID } from '../constants';
import MainPage from './Main';
import {
  getMockClient400Error,
  getMockServer500Error,
  getMockEmptyData,
} from '../utils/test/msw/utils';

import type { WrongAnsweredQuestionType } from '../types';
import userEvent from '@testing-library/user-event';
import { decodeHtmlString } from '../utils';
import QuestionsPage from './Questions';

describe('QuestionsPage', () => {
  afterAll(() => localStorage.clear());

  it('데이터를 불러오는 동안 로딩 스피너를 보여준다.', () => {
    const { getLoadingDiv } = renderQuestionsPage();
    const loadingDiv = getLoadingDiv();

    expect(loadingDiv).toBeInTheDocument();
  });

  it('데이터가 다 불러지면, 첫번째 문제를 확인할 수 있다.', async () => {
    const { findFirstQuestionTitleHeading } = renderQuestionsPage();

    const firstQuestionTitleHeading = await findFirstQuestionTitleHeading();
    expect(firstQuestionTitleHeading).toBeInTheDocument();
  });

  it('문제는 4개의 답지를 가지고 있다.', async () => {
    const { findAnswerList } = renderQuestionsPage();

    const listItems = await findAnswerList();
    expect(listItems).toHaveLength(4);
  });

  it("올바른 답지를 선택 시, '정답입니다' 메세지와 함께 다음 문제로 넘어갈 수 있는 버튼이 화면에 출력된다.", async () => {
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

  it('문제 하단에 현재 문제 풀이 수와 총 문제 수를 보여준다.', async () => {
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

  it("잘못된 답지를 선택 시, '틀렸습니다!' 메세지와 실제 정답, 그리고 다음 문제로 넘어가는 버튼을 보여준다.", async () => {
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

  it('클라이언트에서 에러가 발생 시, 에러 메세지와 메인 페이지로 향하는 링크를 가진 버튼이 화면에 출력된다.', async () => {
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

  it('서버에서 에러가 발생 시, 에러 메세지와 메인 페이지로 향하는 링크를 가진 버튼이 화면에 출력된다.', async () => {
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

  it("해당하는 문제가 없을 시, '해당하는 문제가 없습니다.' 메세지와 메인 페이지로 향하는 링크를 가진 버튼이 화면에 출력된다.", async () => {
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

  it('오답을 선택했을 시, 오답 내역이 클라이언트 저장소(LocalStorage)의 오답 히스토리에 저장된다.', async () => {
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
