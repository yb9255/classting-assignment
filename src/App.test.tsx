import { screen, render, waitFor } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import userEvent from '@testing-library/user-event';
import { decodeHtmlString } from './helpers';

describe('App', () => {
  const user = userEvent.setup();

  afterEach(() => {
    localStorage.clear();
  });

  it('works for every process from scratch to end', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    const startButton = screen.getByRole('link', { name: '퀴즈 풀기' });
    expect(startButton).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(startButton);
    });

    const firstQuestion = await screen.findByText(
      decodeHtmlString(
        'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
      ),
      { exact: false }
    );
    const firstQuestionAnswers = await screen.findAllByRole('listitem');

    expect(firstQuestion).toBeInTheDocument();
    expect(firstQuestionAnswers).toHaveLength(4);

    const correctAnswerOfFirstQuestion = await screen.findByText(
      decodeHtmlString('The Lead Programmer&#039;s birthday')
    );

    await waitFor(async () => {
      await user.click(correctAnswerOfFirstQuestion);
    });

    const correctCaseMessageModal = await screen.findByText('정답입니다!', {
      exact: false,
    });

    const correctCaseNextBtn = await screen.findByRole('button', {
      name: '다음',
    });

    expect(correctCaseMessageModal).toBeInTheDocument();
    expect(correctCaseNextBtn).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(correctCaseNextBtn);
    });

    const secondQuestion = await screen.findByText(
      decodeHtmlString(
        'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
      ),
      { exact: false }
    );
    const secondQuestionAnswers = await screen.findAllByRole('listitem');

    expect(secondQuestion).toBeInTheDocument();
    expect(secondQuestionAnswers).toHaveLength(4);

    const wrongAnswerOfFirstQuestion = await screen.findByText('Closer');

    await waitFor(async () => {
      await user.click(wrongAnswerOfFirstQuestion);
    });

    const wrongCaseMessageModal = await screen.findByText('틀렸습니다!', {
      exact: false,
    });

    const wrongCaseNextBtn = await screen.findByRole('button', {
      name: '다음',
    });

    expect(wrongCaseMessageModal).toBeInTheDocument();
    expect(wrongCaseNextBtn).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(wrongCaseNextBtn);
    });

    const spentTimeDiv = screen.getByText('소요 시간:', { exact: false });

    const correctAnswerCountDiv = screen.getByText('정답 수:', {
      exact: false,
    });

    const wrongAnswerCountDiv = screen.getByText('오답 수: ', {
      exact: false,
    });

    expect(spentTimeDiv).toBeInTheDocument();
    expect(correctAnswerCountDiv).toHaveTextContent('1');
    expect(wrongAnswerCountDiv).toHaveTextContent('1');

    const wrongAnsweredQuestionsPageLink = screen.getByRole('link', {
      name: '오답 노트',
    });

    expect(wrongAnsweredQuestionsPageLink).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(wrongAnsweredQuestionsPageLink);
    });

    const wrongAnsweredQuestionsPageTitle = screen.getByRole('heading', {
      name: '오답 노트',
    });

    const wrongAnsweredQuestionTitle = screen.getByText(
      decodeHtmlString(
        'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
      ),
      { exact: false }
    );

    expect(wrongAnsweredQuestionsPageTitle).toBeInTheDocument();
    expect(wrongAnsweredQuestionTitle).toBeInTheDocument();

    const homeLink = screen.getByRole('link', {
      name: '홈',
    });

    await waitFor(async () => {
      await user.click(homeLink);
    });

    const mainTitle = screen.getByRole('heading', { name: '영화 퀴즈' });
    const navBar = screen.queryByRole('navigation');
    expect(mainTitle).toBeInTheDocument();
    expect(navBar).not.toBeInTheDocument();
  });
});
