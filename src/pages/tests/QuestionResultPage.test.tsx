import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { screen, render, waitFor } from '../../test-utils';
import QuestionsResultPage from '../QuestionsResultPage';
import QuestionPage from '../QuestionPage';
import { decodeHtmlString } from '../../helpers';
import userEvent from '@testing-library/user-event';
import { server } from '../../msw/server';
import { rest } from 'msw';
import { DB_API_URL } from '../../constants';
import MainPage from '../MainPage';

describe('QuestionResult', () => {
  const user = userEvent.setup();

  it('shows 문제 결과 heading when quiz is over', async () => {
    server.resetHandlers(
      rest.get(DB_API_URL, (_, response, context) => {
        return response(
          context.json({
            response_code: 0,
            results: [
              {
                category: 'Entertainment: Video Games',
                type: 'multiple',
                difficulty: 'hard',
                question:
                  'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?',
                correct_answer: 'The Lead Programmer&#039;s birthday',
                incorrect_answers: [
                  'The first release date of &quot;Sonic the Hedgehog&quot;',
                  'The date Sonic Team was founded',
                  'The first release date of &quot;Sonic the Hedgehog 2&quot;',
                ],
              },
            ],
          })
        );
      })
    );

    render(
      <>
        <div id="overlay-root" />
        <MemoryRouter initialEntries={['/questions']}>
          <Routes>
            <Route path="/questions" element={<QuestionPage />} />
            <Route path="/questions-result" element={<QuestionsResultPage />} />
          </Routes>
        </MemoryRouter>
      </>
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

    const questionResultHeading = screen.getByRole('heading', {
      name: '문제 결과',
    });

    expect(questionResultHeading).toBeInTheDocument();
  });

  it('shows how long it takes to solve the problems', async () => {
    server.resetHandlers(
      rest.get(DB_API_URL, (_, response, context) => {
        return response(
          context.json({
            response_code: 0,
            results: [
              {
                category: 'Entertainment: Video Games',
                type: 'multiple',
                difficulty: 'hard',
                question:
                  'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?',
                correct_answer: 'The Lead Programmer&#039;s birthday',
                incorrect_answers: [
                  'The first release date of &quot;Sonic the Hedgehog&quot;',
                  'The date Sonic Team was founded',
                  'The first release date of &quot;Sonic the Hedgehog 2&quot;',
                ],
              },
            ],
          })
        );
      })
    );

    render(
      <>
        <div id="overlay-root" />
        <MemoryRouter initialEntries={['/questions']}>
          <Routes>
            <Route path="/questions" element={<QuestionPage />} />
            <Route path="/questions-result" element={<QuestionsResultPage />} />
          </Routes>
        </MemoryRouter>
      </>
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

    const spentTimeDiv = screen.getByText('소요 시간:', { exact: false });
    expect(spentTimeDiv).toBeInTheDocument();
  });

  it('shows spent time with mm:ss format', () => {
    render(
      <MemoryRouter initialEntries={['/questions-result']}>
        <Routes>
          <Route path="/questions-result" element={<QuestionsResultPage />} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          questions: {
            startTime: 0,
            endTime: 650000,
          },
        },
      }
    );

    const spentTimeDiv = screen.getByText('소요 시간:', { exact: false });
    expect(spentTimeDiv).toHaveTextContent('10:50');
  });

  it('shows how many rights and wrongs user got', async () => {
    render(
      <>
        <div id="overlay-root" />
        <MemoryRouter initialEntries={['/questions']}>
          <Routes>
            <Route path="/questions" element={<QuestionPage />} />
            <Route path="/questions-result" element={<QuestionsResultPage />} />
          </Routes>
        </MemoryRouter>
      </>
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

  it('moves to main page if there is no difference between start time and end time', () => {
    render(
      <MemoryRouter initialEntries={['/questions-result']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/questions-result" element={<QuestionsResultPage />} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          questions: {
            startTime: 0,
            endTime: 0,
          },
        },
      }
    );

    const mainTitle = screen.getByRole('heading', { name: '영화 퀴즈' });
    expect(mainTitle).toBeInTheDocument();
  });
});
