import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { screen, render, waitFor } from '../../test-utils';
import QuestionPage from '../QuestionPage';
import userEvent from '@testing-library/user-event';
import { server } from '../../msw/server';
import { rest } from 'msw';
import { DB_API_URL } from '../../constants';
import MainPage from '../MainPage';
import { decodeHtmlString } from '../../helpers';
import { WrongAnsweredQuestionType } from '../WrongAnsweredQuestionsPage';

describe('QuestionPage', () => {
  const user = userEvent.setup();
  afterAll(() => localStorage.clear());

  it('shows loading before question is rendered', () => {
    render(
      <MemoryRouter initialEntries={['/questions']}>
        <Routes>
          <Route path="/questions" element={<QuestionPage />} />
        </Routes>
      </MemoryRouter>
    );

    const loadingComponent = screen.getByRole('heading', {
      name: /loading.../i,
    });

    expect(loadingComponent).toBeInTheDocument();
  });

  it('shows question itself as heading', async () => {
    render(
      <MemoryRouter initialEntries={['/questions']}>
        <Routes>
          <Route path="/questions" element={<QuestionPage />} />
        </Routes>
      </MemoryRouter>
    );

    const question = await screen.findByText(
      decodeHtmlString(
        'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
      ),
      { exact: false }
    );

    expect(question).toBeInTheDocument();
  });

  it('shows 4 choices', async () => {
    render(
      <MemoryRouter initialEntries={['/questions']}>
        <Routes>
          <Route path="/questions" element={<QuestionPage />} />
        </Routes>
      </MemoryRouter>
    );

    const listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(4);
  });

  it("shows message '정답입니다!' when the answer is correct", async () => {
    render(
      <>
        <div id="overlay-root" />
        <MemoryRouter initialEntries={['/questions']}>
          <Routes>
            <Route path="/questions" element={<QuestionPage />} />
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
  });

  it("shows message '틀렸습니다!' when the answer is wrong", async () => {
    render(
      <>
        <div id="overlay-root" />
        <MemoryRouter initialEntries={['/questions']}>
          <Routes>
            <Route path="/questions" element={<QuestionPage />} />
          </Routes>
        </MemoryRouter>
      </>
    );

    const wrongAnswer = await screen.findByText(
      decodeHtmlString(
        'The first release date of &quot;Sonic the Hedgehog&quot;'
      )
    );

    await waitFor(async () => {
      await user.click(wrongAnswer);
    });

    const messageModal = await screen.findByText('틀렸습니다!', {
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
  });

  it('shows error message when wrong request occurred', async () => {
    render(
      <MemoryRouter initialEntries={['/questions']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/questions" element={<QuestionPage />} />
        </Routes>
      </MemoryRouter>
    );

    server.resetHandlers(
      rest.get(DB_API_URL, (_, response, context) => {
        return response(
          context.json({
            response_code: 2,
            results: [],
          })
        );
      })
    );

    const errorHeading = await screen.findByRole('heading', {
      name: /ERROR/i,
    });

    expect(errorHeading).toBeInTheDocument();

    const errorBtn = await screen.findByRole('link', {
      name: '돌아가기',
    });

    await waitFor(async () => {
      await user.click(errorBtn);
    });

    const mainTitle = screen.queryByRole('heading', { name: '영화 퀴즈' });
    expect(mainTitle).toBeInTheDocument();
  });

  it('shows error message when server error occurred', async () => {
    render(
      <MemoryRouter initialEntries={['/questions']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/questions" element={<QuestionPage />} />
        </Routes>
      </MemoryRouter>
    );

    server.resetHandlers(
      rest.get(DB_API_URL, (_, response, context) => {
        return response(context.status(500));
      })
    );

    const errorHeading = await screen.findByRole('heading', {
      name: /ERROR/i,
    });

    expect(errorHeading).toBeInTheDocument();

    const errorBtn = await screen.findByRole('link', {
      name: '돌아가기',
    });

    await waitFor(async () => {
      await user.click(errorBtn);
    });

    const mainTitle = screen.queryByRole('heading', { name: '영화 퀴즈' });
    expect(mainTitle).toBeInTheDocument();
  });

  it('shows 해당하는 문제가 없습니다. message when there is no error and result', async () => {
    render(
      <MemoryRouter initialEntries={['/questions']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/questions" element={<QuestionPage />} />
        </Routes>
      </MemoryRouter>
    );

    server.resetHandlers(
      rest.get(DB_API_URL, (_, response, context) => {
        return response(
          context.json({
            response_code: 1,
            results: [],
          })
        );
      })
    );

    const heading = await screen.findByRole('heading', {
      name: '해당하는 문제가 없습니다.',
      exact: false,
    });

    expect(heading).toBeInTheDocument();

    const backBtn = await screen.findByRole('link', {
      name: '돌아가기',
    });

    await waitFor(async () => {
      await user.click(backBtn);
    });

    const mainTitle = screen.queryByRole('heading', { name: '영화 퀴즈' });
    expect(mainTitle).toBeInTheDocument();
  });

  it('save wrong answered question in localStorage', async () => {
    render(
      <MemoryRouter initialEntries={['/questions']}>
        <Routes>
          <Route path="/questions" element={<QuestionPage />} />
        </Routes>
      </MemoryRouter>
    );

    const wrongAnswer = await screen.findByText(
      decodeHtmlString(
        'The first release date of &quot;Sonic the Hedgehog&quot;'
      )
    );

    await waitFor(async () => {
      await user.click(wrongAnswer);
    });

    const wrongAnsweredQuestionData = localStorage.getItem(
      'wrong-answered-questions'
    );

    const wrongAnsweredQuestionsHistory: WrongAnsweredQuestionType[] =
      wrongAnsweredQuestionData ? JSON.parse(wrongAnsweredQuestionData) : [];

    expect(wrongAnsweredQuestionsHistory[0].correctAnswer).toBe(
      decodeHtmlString('The Lead Programmer&#039;s birthday')
    );

    expect(wrongAnsweredQuestionsHistory[0].chosenAnswer).toBe(
      decodeHtmlString(
        'The first release date of &quot;Sonic the Hedgehog&quot;'
      )
    );
  });
});
