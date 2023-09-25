import { render, screen, waitFor } from '../../../test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import QuestionsResultPage from '../../QuestionsResultPage';
import { InitialState } from '../../../redux/questions/types';
import { decodeHtmlString } from '../../../helpers';

type Props = {
  initialEntries?: string[];
  otherRoutes?: ReactElement[];
  preloadedState?: { questions: Partial<InitialState> };
};

function renderQuestionResultPage({
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
    const mainButton = screen.getByRole('link', { name: '퀴즈 풀기' });

    await waitForUserClick(mainButton);

    const secondTestCorrectAnswer = await screen.findByText(
      decodeHtmlString('The Lead Programmer&#039;s birthday')
    );

    await waitForUserClick(secondTestCorrectAnswer);

    const secondTestMessageModal = await screen.findByText('정답입니다!', {
      exact: false,
    });

    const secondTestNextBtn = await screen.findByRole('button', {
      name: '다음',
    });

    expect(secondTestMessageModal).toBeInTheDocument();
    expect(secondTestNextBtn).toBeInTheDocument();

    await waitForUserClick(secondTestNextBtn);

    const secondNextQuestionCorrectAnswer = await screen.findByText(
      decodeHtmlString('Hurt')
    );

    expect(secondNextQuestionCorrectAnswer).toBeInTheDocument();

    await waitForUserClick(secondNextQuestionCorrectAnswer);

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

    await waitForUserClick(secondNextQuestionNextBtn);
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

export default renderQuestionResultPage;
