import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { screen, render } from '../../test-utils';
import QuestionPage from '../QuestionPage';
import userEvent from '@testing-library/user-event';
import MainPage from '../MainPage';
import { server } from '../../msw/server';
import { rest } from 'msw';
import { DB_API_URL } from '../../constants';

describe('MainPage', () => {
  it('shows loading before question is rendered', () => {
    render(
      <MemoryRouter initialEntries={['/questions/0']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/questions/:questionId" element={<QuestionPage />} />
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
      <MemoryRouter initialEntries={['/questions/0']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/questions/:questionId" element={<QuestionPage />} />
        </Routes>
      </MemoryRouter>
    );

    const question = await screen.findByText(
      'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?',
      { exact: false }
    );

    expect(question).toBeInTheDocument();
  });

  it('shows 4 choices', async () => {
    render(
      <MemoryRouter initialEntries={['/questions/0']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/questions/:questionId" element={<QuestionPage />} />
        </Routes>
      </MemoryRouter>
    );
    const listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(4);
  });

  it("shows message '정답입니다!' when the answer is correct", async () => {
    render(
      <MemoryRouter initialEntries={['/questions/0']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/questions/:questionId" element={<QuestionPage />} />
        </Routes>
      </MemoryRouter>
    );

    const user = userEvent.setup();

    const correctAnswer = await screen.findByRole('listitem', {
      name: 'The Lead Programmer&#039;s birthday',
    });

    await user.click(correctAnswer);

    const messageModal = await screen.findByText('정답입니다!', {
      exact: false,
    });
    const nextBtn = await screen.findByRole('button', { name: '다음' });

    expect(messageModal).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
  });

  it("shows message '틀렸습니다!' when the answer is correct", async () => {
    render(
      <MemoryRouter initialEntries={['/questions/0']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/questions/:questionId" element={<QuestionPage />} />
        </Routes>
      </MemoryRouter>
    );

    const user = userEvent.setup();

    const correctAnswer = await screen.findByRole('listitem', {
      name: 'The first release date of &quot;Sonic the Hedgehog&quot;',
    });

    await user.click(correctAnswer);

    const messageModal = await screen.findByText('틀렸습니다!', {
      exact: false,
    });

    const nextBtn = await screen.findByRole('button', { name: '다음' });

    expect(messageModal).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
  });

  it('shows error message when error occurred', async () => {
    render(
      <MemoryRouter initialEntries={['/questions/0']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/questions/:questionId" element={<QuestionPage />} />
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
  });

  it('shows 해당하는 문제가 없습니다. message when there is no error and result', async () => {
    render(
      <MemoryRouter initialEntries={['/questions/0']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/questions/:questionId" element={<QuestionPage />} />
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

    const errorHeading = await screen.findByRole('heading', {
      name: '해당하는 문제가 없습니다',
      exact: false,
    });

    expect(errorHeading).toBeInTheDocument();
  });
});
