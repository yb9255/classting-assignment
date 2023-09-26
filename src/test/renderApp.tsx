import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../redux/store';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { decodeHtmlString } from '../utils';

function renderApp() {
  const user = userEvent.setup();

  render(
    <>
      <div id="overlay-root" />
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    </>
  );

  const getMainTitleHeading = () =>
    screen.getByRole('heading', { name: '영화 퀴즈' });

  const getMainPageStartLink = () =>
    screen.getByRole('link', { name: '퀴즈 풀기' });

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

  const getWrongAnsweredQuestionPageLink = () =>
    screen.getByRole('link', {
      name: '오답 노트',
    });

  const getWrongAnsweredQuestionHeading = () =>
    screen.getByRole('heading', { name: '오답 노트' });

  const getWrongAnsweredQuestionTitleDiv = () =>
    screen.getByText(
      decodeHtmlString(
        'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
      ),
      { exact: false }
    );

  const getHomeLink = () =>
    screen.getByRole('link', {
      name: '홈',
    });

  const findQuestionTitleHeading = ({
    rawHeadingText,
  }: {
    rawHeadingText: string;
  }) => screen.findByText(decodeHtmlString(rawHeadingText), { exact: false });

  const findQuestionAnswersList = () => screen.findAllByRole('listitem');

  const findFirstQuestionCorrectAnswer = () =>
    screen.findByText(decodeHtmlString('The Lead Programmer&#039;s birthday'));

  const findCorrectCaseModalDiv = () =>
    screen.findByText('정답입니다!', {
      exact: false,
    });

  const findWrongCaseModalDiv = () =>
    screen.findByText('틀렸습니다!', {
      exact: false,
    });

  const findCorrectAnswerInWrongCaseModalDiv = () =>
    screen.findByText(`정답: `, {
      exact: false,
    });

  const findModalNextButton = () =>
    screen.findByRole('button', {
      name: '다음',
    });

  const findSecondQuestionWrongAnswer = () => screen.findByText('Closer');

  const queryNavBar = () => screen.queryByRole('navigation');

  const waitForUserClick = async (targetElement: Element) => {
    await waitFor(async () => {
      await user.click(targetElement);
    });
  };

  return {
    getMainTitleHeading,
    getMainPageStartLink,
    getSpentTimeDiv,
    getCorrectAnswerCountDiv,
    getWrongAnswerCountDiv,
    getWrongAnsweredQuestionTitleDiv,
    getWrongAnsweredQuestionPageLink,
    getWrongAnsweredQuestionHeading,
    getHomeLink,
    findQuestionTitleHeading,
    findQuestionAnswersList,
    findFirstQuestionCorrectAnswer,
    findCorrectCaseModalDiv,
    findWrongCaseModalDiv,
    findCorrectAnswerInWrongCaseModalDiv,
    findModalNextButton,
    findSecondQuestionWrongAnswer,
    queryNavBar,
    waitForUserClick,
  };
}

export default renderApp;
