import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { screen, render, waitFor } from './utils/test/test-utils';
import store from './redux/store';
import App from './App';
import { decodeHtmlString } from './utils';

describe('App', () => {
  beforeAll(() => {
    localStorage.clear();
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('works for every process from scratch to end', async () => {
    const {
      getMainTitleHeading,
      getMainPageStartLink,
      getSpentTimeDiv,
      getCorrectAnswerCountDiv,
      getWrongAnswerCountDiv,
      getWrongAnsweredQuestionPageLink,
      getWrongAnsweredQuestionHeading,
      getWrongAnsweredQuestionTitleDiv,
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
    } = renderApp();

    /** 메인 페이지에서 '퀴즈 풀기' 링크를 클릭 */
    const mainPageStartLink = getMainPageStartLink();
    expect(mainPageStartLink).toBeInTheDocument();

    await waitForUserClick(mainPageStartLink);

    /** 첫번째 문제가 화면에 출력됨 */
    const firstQuestionTitleHeading = await findQuestionTitleHeading({
      rawHeadingText:
        'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?',
    });

    const firstQuestionAnswerList = await findQuestionAnswersList();

    expect(firstQuestionTitleHeading).toBeInTheDocument();
    expect(firstQuestionAnswerList).toHaveLength(4);

    /** 첫번째 문제는 정답을 클릭함 */
    const firstQuestionCorrectAnswer = await findFirstQuestionCorrectAnswer();
    expect(firstQuestionCorrectAnswer).toBeInTheDocument();

    await waitForUserClick(firstQuestionCorrectAnswer);

    /** 정답임을 알려주는 모달이 화면에 출력되고, 다음 버튼을 누름 */
    const correctCaseMessageModalDiv = await findCorrectCaseModalDiv();
    const correctCaseNextButton = await findModalNextButton();

    expect(correctCaseMessageModalDiv).toBeInTheDocument();
    expect(correctCaseNextButton).toBeInTheDocument();

    await waitForUserClick(correctCaseNextButton);

    /** 두번째 문제가 화면에 출력되고, 오답을 클릭함 */
    const secondQuestionTitleHeading = await findQuestionTitleHeading({
      rawHeadingText:
        'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.',
    });
    const secondQuestionAnswerList = await findQuestionAnswersList();

    expect(secondQuestionTitleHeading).toBeInTheDocument();
    expect(secondQuestionAnswerList).toHaveLength(4);

    const secondQuestionWrongAnswer = await findSecondQuestionWrongAnswer();

    await waitForUserClick(secondQuestionWrongAnswer);

    /** 오답을 선택했음과 정답을 알려주는 모달이 뜨고, 모달에 있는 다음 버튼을 클릭함. */
    const wrongCaseModalDiv = await findWrongCaseModalDiv();

    const correctAnswerInWrongCaseModalDiv =
      await findCorrectAnswerInWrongCaseModalDiv();

    const wrongCaseNextButton = await findModalNextButton();

    expect(wrongCaseModalDiv).toBeInTheDocument();
    expect(correctAnswerInWrongCaseModalDiv).toBeInTheDocument();
    expect(wrongCaseNextButton).toBeInTheDocument();

    await waitForUserClick(wrongCaseNextButton);

    /** 소요 시간, 정답 개수, 오답 개수가 화면에 출력됨 */
    const spentTimeDiv = getSpentTimeDiv();
    const correctAnswerCountDiv = getCorrectAnswerCountDiv();
    const wrongAnswerCountDiv = getWrongAnswerCountDiv();

    expect(spentTimeDiv).toBeInTheDocument();
    expect(correctAnswerCountDiv).toHaveTextContent('1');
    expect(wrongAnswerCountDiv).toHaveTextContent('1');

    /** 상단에 오답 노트 링크를 클릭함 */
    const wrongAnsweredQuestionsPageLink = getWrongAnsweredQuestionPageLink();

    expect(wrongAnsweredQuestionsPageLink).toBeInTheDocument();

    await waitForUserClick(wrongAnsweredQuestionsPageLink);

    /** 오답 노트 제목과 오답 제목이 화면에 출력됨 */
    const wrongAnsweredPagesHeading = getWrongAnsweredQuestionHeading();
    const wrongAnsweredQuestionTitleDiv = getWrongAnsweredQuestionTitleDiv();

    expect(wrongAnsweredPagesHeading).toBeInTheDocument();
    expect(wrongAnsweredQuestionTitleDiv).toBeInTheDocument();

    /** 화면 상단 네비게이션 바에 홈 버튼을 누름 */
    const homeLink = getHomeLink();
    expect(homeLink).toBeInTheDocument();

    await waitForUserClick(homeLink);

    /** 홈에서 페이지 타이틀이 보이고, 네비게이션 바는 사라짐 */
    const mainTitle = getMainTitleHeading();
    const navBar = queryNavBar();

    expect(mainTitle).toBeInTheDocument();
    expect(navBar).not.toBeInTheDocument();
  });
});

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
