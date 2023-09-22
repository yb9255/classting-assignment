import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { screen, render, waitFor } from '../../test-utils';
import QuestionsResultPage from '../QuestionsResultPage';
import QuestionPage from '../QuestionPage';
import { decodeHtmlString } from '../../helpers';
import userEvent from '@testing-library/user-event';

describe('QuestionResult', () => {
  const user = userEvent.setup();

  it('shows 문제 결과 heading when page is rendered', () => {
    render(
      <MemoryRouter initialEntries={['/questions-result']}>
        <Routes>
          <Route path="/questions-result" element={<QuestionsResultPage />} />
        </Routes>
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { name: '문제 결과' });
    expect(heading).toBeInTheDocument();
  });

  it('shows how long it takes to solve the problems', () => {
    render(
      <MemoryRouter initialEntries={['/questions-result']}>
        <Routes>
          <Route path="/questions-result" element={<QuestionsResultPage />} />
        </Routes>
      </MemoryRouter>
    );

    const spentTimeDiv = screen.getByText('소요 시간: ', { exact: false });
    expect(spentTimeDiv).toBeInTheDocument();
  });

  it('shows how many rights and wrongs user got', async () => {
    render(
      <MemoryRouter initialEntries={['/questions']}>
        <Routes>
          <Route path="/questions" element={<QuestionPage />} />
          <Route path="/questions-result" element={<QuestionsResultPage />} />
        </Routes>
      </MemoryRouter>
    );

    const correctAnswer = await screen.findByText(
      decodeHtmlString('The Lead Programmer&#039;s birthday')
    );

    await waitFor(async () => {
      await user.click(correctAnswer);
    });

    const messageModal = await screen.findByText('정답입니다!', {
      exact: false,
    });

    const nextBtn = await screen.findByRole('button', { name: '다음' });

    expect(messageModal).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(nextBtn);
    });

    const nextQuestionTitle = await screen.findByText(
      decodeHtmlString(
        'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
      ),
      { exact: false }
    );

    expect(nextQuestionTitle).toBeInTheDocument();

    const nextQuestionWrongAnswer = await screen.findByText(
      decodeHtmlString('Closer')
    );

    expect(nextQuestionWrongAnswer).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(nextQuestionWrongAnswer);
    });

    const nextQuestionMessageModal = await screen.findByText('틀렸습니다!', {
      exact: false,
    });

    const nextQuestionNextBtn = await screen.findByRole('button', {
      name: '다음',
    });

    expect(nextQuestionMessageModal).toBeInTheDocument();
    expect(nextQuestionNextBtn).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(nextQuestionNextBtn);
    });

    const correctAnswerCountDiv = screen.getByText('정답 수:', {
      exact: false,
    });

    const wrongAnswerCountDiv = screen.getByText('오답 수: ', {
      exact: false,
    });

    expect(correctAnswerCountDiv).toHaveTextContent('1');
    expect(wrongAnswerCountDiv).toHaveTextContent('1');
  });
});
