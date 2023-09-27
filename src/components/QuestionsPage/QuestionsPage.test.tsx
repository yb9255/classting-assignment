import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, waitFor } from '../../utils/test/test-utils';

import { LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID } from '../../constants';
import {
  getMockClient400Error,
  getMockServer500Error,
  getMockEmptyData,
} from '../../utils/test/msw/utils';

import type { WrongAnsweredQuestionType } from '../../types';
import userEvent from '@testing-library/user-event';
import { decodeHtmlString } from '../../utils';
import QuestionsPage from './QuestionsPage';

describe('QuestionsPage', () => {
  afterAll(() => localStorage.clear());

  it('문제 데이터를 불러오는 동안 로딩 스피너를 보여준다.', () => {
    const { LoadingDiv } = renderQuestionsPage();
    expect(LoadingDiv()).toBeInTheDocument();
  });

  it('문제 데이터가 다 불러지면, 첫번째 문제를 확인할 수 있다.', async () => {
    const { FirstQuestionTitleHeading } = renderQuestionsPage();
    expect(await FirstQuestionTitleHeading()).toBeInTheDocument();
  });

  it('문제는 4개의 답지를 가지고 있다.', async () => {
    const { AnswerList } = renderQuestionsPage();
    expect(await AnswerList()).toHaveLength(4);
  });

  it('문제 하단에 현재 문제 풀이 수와 총 문제 수를 보여준다.', async () => {
    const {
      clickCorrectAnswerOfFirstQuestionLi,
      clickModalNextButton,
      ProgressOnFirstQuestionDiv,
      ProgressOnSecondQuestionDiv,
    } = renderQuestionsPage();

    expect(await ProgressOnFirstQuestionDiv()).toBeInTheDocument();

    await clickCorrectAnswerOfFirstQuestionLi();

    await clickModalNextButton();

    expect(await ProgressOnSecondQuestionDiv()).toBeInTheDocument();
  });

  it("올바른 답지를 선택 시, '정답입니다' 메세지와 함께 다음 문제로 넘어갈 수 있는 버튼이 화면에 출력된다.", async () => {
    const {
      CorrectAnswerOfFirstQuestionLi,
      clickCorrectAnswerOfFirstQuestionLi,
      CorrectAnswerModal,
      ModalNextButton,
      clickModalNextButton,
      SecondQuestionTitleHeading,
    } = renderQuestionsPage();

    expect(await CorrectAnswerOfFirstQuestionLi()).toBeInTheDocument();

    await clickCorrectAnswerOfFirstQuestionLi();

    expect(await CorrectAnswerModal()).toBeInTheDocument();
    expect(await ModalNextButton()).toBeInTheDocument();

    await clickModalNextButton();

    expect(await SecondQuestionTitleHeading()).toBeInTheDocument();
  });

  it("잘못된 답지를 선택 시, '틀렸습니다!' 메세지와 실제 정답, 그리고 다음 문제로 넘어가는 버튼을 보여준다.", async () => {
    const {
      WrongAnswerOfFirstQuestionLi,
      clickWrongAnswerOfFirstQuestionLi,
      WrongAnswerModal,
      CorrectAnswerInWrongAnswerModalDiv,
      SecondQuestionTitleHeading,
      ModalNextButton,
      clickModalNextButton,
    } = renderQuestionsPage();

    expect(await WrongAnswerOfFirstQuestionLi()).toBeInTheDocument();

    await clickWrongAnswerOfFirstQuestionLi();

    expect(await WrongAnswerModal()).toBeInTheDocument();
    expect(await CorrectAnswerInWrongAnswerModalDiv()).toBeInTheDocument();
    expect(await ModalNextButton()).toBeInTheDocument();

    await clickModalNextButton();

    expect(await SecondQuestionTitleHeading()).toBeInTheDocument();
  });

  it('클라이언트에서 에러가 발생 시, 에러 메세지와 메인 페이지로 향하는 링크를 가진 버튼이 화면에 출력된다.', async () => {
    getMockClient400Error();

    const { ErrorHeading, BackLink } = renderQuestionsPage();

    expect(await ErrorHeading()).toBeInTheDocument();
    expect(await BackLink()).toBeInTheDocument();
    expect(await BackLink()).toHaveAttribute('href', '/');
  });

  it('서버에서 에러가 발생 시, 에러 메세지와 메인 페이지로 향하는 링크를 가진 버튼이 화면에 출력된다.', async () => {
    getMockServer500Error();

    const { ErrorHeading, BackLink } = renderQuestionsPage();

    expect(await ErrorHeading()).toBeInTheDocument();
    expect(await BackLink()).toBeInTheDocument();
    expect(await BackLink()).toHaveAttribute('href', '/');
  });

  it("해당하는 문제가 없을 시, '해당하는 문제가 없습니다.' 메세지와 메인 페이지로 향하는 링크를 가진 버튼이 화면에 출력된다.", async () => {
    getMockEmptyData();

    const { EmptyQuestionPageHeading, BackLink } = renderQuestionsPage();

    expect(await EmptyQuestionPageHeading()).toBeInTheDocument();
    expect(await BackLink()).toBeInTheDocument();
    expect(await BackLink()).toHaveAttribute('href', '/');
  });

  it('오답을 선택했을 시, 오답 내역이 클라이언트 저장소(LocalStorage)의 오답 히스토리에 저장된다.', async () => {
    const {
      correctAnswerOfFirstQuestion,
      wrongAnswerOfFirstQuestion,
      clickWrongAnswerOfFirstQuestionLi,
    } = renderQuestionsPage();

    await clickWrongAnswerOfFirstQuestionLi();

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

function renderQuestionsPage() {
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
      <MemoryRouter initialEntries={['/questions']}>
        <Routes>
          <Route path="/questions" element={<QuestionsPage />} />
        </Routes>
      </MemoryRouter>
    </>
  );

  const LoadingDiv = () => screen.getByTestId('loading-spinner');

  const FirstQuestionTitleHeading = () =>
    screen.findByText(titleOfFirstQuestion, {
      exact: false,
    });

  const AnswerList = () => screen.findAllByRole('listitem');

  const CorrectAnswerOfFirstQuestionLi = () =>
    screen.findByText(correctAnswerOfFirstQuestion);

  const WrongAnswerOfFirstQuestionLi = () =>
    screen.findByText(wrongAnswerOfFirstQuestion);

  const CorrectAnswerModal = () =>
    screen.findByText('정답입니다!', {
      exact: false,
    });

  const WrongAnswerModal = () =>
    screen.findByText('틀렸습니다!', {
      exact: false,
    });

  const CorrectAnswerInWrongAnswerModalDiv = () =>
    screen.findByText(`정답: ${correctAnswerOfFirstQuestion}`, {
      exact: false,
    });

  const ModalNextButton = () => screen.findByRole('button', { name: '다음' });

  const SecondQuestionTitleHeading = () =>
    screen.findByText(titleOfSecondQuestion, {
      exact: false,
    });

  const ErrorHeading = () =>
    screen.findByRole('heading', {
      name: /ERROR/i,
    });

  const EmptyQuestionPageHeading = () =>
    screen.findByRole('heading', {
      name: '해당하는 문제가 없습니다.',
      exact: false,
    });

  const BackLink = () =>
    screen.findByRole('link', {
      name: '돌아가기',
    });

  const ProgressOnFirstQuestionDiv = () =>
    screen.findByText(mockProgressTextOnFirstQuestion);
  const ProgressOnSecondQuestionDiv = () =>
    screen.findByText(mockProgressTextOnSecondQuestion);

  const waitForUserClick = async (targetElement: Element) => {
    const user = userEvent.setup();

    await waitFor(async () => {
      await user.click(targetElement);
    });
  };

  const clickCorrectAnswerOfFirstQuestionLi = async () =>
    await waitForUserClick(await CorrectAnswerOfFirstQuestionLi());

  const clickModalNextButton = async () =>
    await waitForUserClick(await ModalNextButton());

  const clickWrongAnswerOfFirstQuestionLi = async () =>
    await waitForUserClick(await WrongAnswerOfFirstQuestionLi());

  return {
    correctAnswerOfFirstQuestion,
    wrongAnswerOfFirstQuestion,
    LoadingDiv,
    FirstQuestionTitleHeading,
    AnswerList,
    CorrectAnswerOfFirstQuestionLi,
    clickCorrectAnswerOfFirstQuestionLi,
    WrongAnswerOfFirstQuestionLi,
    clickWrongAnswerOfFirstQuestionLi,
    CorrectAnswerModal,
    WrongAnswerModal,
    CorrectAnswerInWrongAnswerModalDiv,
    ModalNextButton,
    clickModalNextButton,
    SecondQuestionTitleHeading,
    ErrorHeading,
    EmptyQuestionPageHeading,
    BackLink,
    ProgressOnFirstQuestionDiv,
    ProgressOnSecondQuestionDiv,
  };
}
