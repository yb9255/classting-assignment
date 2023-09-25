import { render, screen, waitFor } from '../../../test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import QuestionsPage from '../../QuestionsPage';
import { decodeHtmlString } from '../../../helpers';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';

type Props = {
  initialEntries?: string[];
  otherRoutes?: ReactElement[];
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
    waitForUserClick,
  };
}

export default renderQuestionsPage;
