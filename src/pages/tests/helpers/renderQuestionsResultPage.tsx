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

export default renderQuestionResultPage;
