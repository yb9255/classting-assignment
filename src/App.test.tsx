import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { screen, render, waitFor } from './utils/test/test-utils';
import store from './redux/store';
import App from './App';
import { decodeHtmlString } from './utils';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("메인 화면에서 '퀴즈 풀기' 버튼을 누르면 퀴즈가 시작되고, 퀴즈를 다 풀고 나서 퀴즈 결과 페이지 확인이 가능하며, 오답 노트 링크 버튼을 누르면 오답 노트 페이지로, 홈 링크 버튼을 클릭하면 홈으로 이동합니다.", async () => {
    const {
      MainTitleHeading,
      MainPageStartLink,
      SpentTimeDiv,
      CorrectAnswerCountDiv,
      WrongAnswerCountDiv,
      WrongAnsweredQuestionPageLink,
      WrongAnsweredQuestionHeading,
      WrongAnsweredQuestionTitleDiv,
      HomeLink,
      FirstQuestionTitleHeading,
      QuestionAnswersList,
      FirstQuestionCorrectAnswer,
      CorrectCaseModalDiv,
      WrongCaseModalDiv,
      CorrectAnswerInWrongCaseModalDiv,
      ModalNextButton,
      SecondQuestionTitleHeading,
      SecondQuestionWrongAnswer,
      NavBar,
      clickMainPageStartLink,
      clickFirstQuestionCorrectAnswer,
      clickModalNextButton,
      clickSecondQuestionWrongAnswer,
      clickWrongAnsweredQuestionPageLink,
      clickHomeLink,
    } = renderApp();

    expect(MainPageStartLink()).toBeInTheDocument();

    await clickMainPageStartLink();

    expect(await FirstQuestionTitleHeading()).toBeInTheDocument();
    expect(await QuestionAnswersList()).toHaveLength(4);

    expect(await FirstQuestionCorrectAnswer()).toBeInTheDocument();

    await clickFirstQuestionCorrectAnswer();

    expect(await CorrectCaseModalDiv()).toBeInTheDocument();
    expect(await ModalNextButton()).toBeInTheDocument();

    await clickModalNextButton();

    expect(await SecondQuestionTitleHeading()).toBeInTheDocument();
    expect(await QuestionAnswersList()).toHaveLength(4);
    expect(await SecondQuestionWrongAnswer()).toBeInTheDocument();

    await clickSecondQuestionWrongAnswer();

    expect(await WrongCaseModalDiv()).toBeInTheDocument();
    expect(await CorrectAnswerInWrongCaseModalDiv()).toBeInTheDocument();
    expect(await ModalNextButton()).toBeInTheDocument();

    await clickModalNextButton();

    expect(SpentTimeDiv()).toBeInTheDocument();
    expect(CorrectAnswerCountDiv()).toHaveTextContent('1');
    expect(WrongAnswerCountDiv()).toHaveTextContent('1');

    expect(WrongAnsweredQuestionPageLink()).toBeInTheDocument();

    await clickWrongAnsweredQuestionPageLink();

    expect(WrongAnsweredQuestionHeading()).toBeInTheDocument();
    expect(WrongAnsweredQuestionTitleDiv()).toBeInTheDocument();

    expect(HomeLink()).toBeInTheDocument();

    await clickHomeLink();

    expect(MainTitleHeading()).toBeInTheDocument();
    expect(NavBar()).not.toBeInTheDocument();
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

  const MainTitleHeading = () =>
    screen.getByRole('heading', { name: '영화 퀴즈' });

  const MainPageStartLink = () =>
    screen.getByRole('link', { name: '퀴즈 풀기' });

  const SpentTimeDiv = () => screen.getByText('소요 시간:', { exact: false });

  const CorrectAnswerCountDiv = () =>
    screen.getByText('정답 수:', {
      exact: false,
    });

  const WrongAnswerCountDiv = () =>
    screen.getByText('오답 수: ', {
      exact: false,
    });

  const WrongAnsweredQuestionPageLink = () =>
    screen.getByRole('link', {
      name: '오답 노트',
    });

  const WrongAnsweredQuestionHeading = () =>
    screen.getByRole('heading', { name: '오답 노트' });

  const WrongAnsweredQuestionTitleDiv = () =>
    screen.getByText(
      decodeHtmlString(
        'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
      ),
      { exact: false }
    );

  const HomeLink = () =>
    screen.getByRole('link', {
      name: '홈',
    });

  const FirstQuestionTitleHeading = () =>
    screen.findByText(
      decodeHtmlString(
        'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
      ),
      { exact: false }
    );

  const QuestionAnswersList = () => screen.findAllByRole('listitem');

  const FirstQuestionCorrectAnswer = () =>
    screen.findByText(decodeHtmlString('The Lead Programmer&#039;s birthday'));

  const CorrectCaseModalDiv = () =>
    screen.findByText('정답입니다!', {
      exact: false,
    });

  const WrongCaseModalDiv = () =>
    screen.findByText('틀렸습니다!', {
      exact: false,
    });

  const CorrectAnswerInWrongCaseModalDiv = () =>
    screen.findByText(`정답: `, {
      exact: false,
    });

  const ModalNextButton = () =>
    screen.findByRole('button', {
      name: '다음',
    });

  const SecondQuestionTitleHeading = () =>
    screen.findByText(
      decodeHtmlString(
        'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
      ),
      { exact: false }
    );
  const SecondQuestionWrongAnswer = () => screen.findByText('Closer');

  const NavBar = () => screen.queryByRole('navigation');

  const waitForUserClick = async (targetElement: Element) => {
    await waitFor(async () => {
      await user.click(targetElement);
    });
  };

  const clickMainPageStartLink = async () =>
    await waitForUserClick(MainPageStartLink());

  const clickFirstQuestionCorrectAnswer = async () =>
    await waitForUserClick(await FirstQuestionCorrectAnswer());

  const clickModalNextButton = async () =>
    await waitForUserClick(await ModalNextButton());

  const clickSecondQuestionWrongAnswer = async () =>
    await waitForUserClick(await SecondQuestionWrongAnswer());

  const clickWrongAnsweredQuestionPageLink = async () =>
    await waitForUserClick(WrongAnsweredQuestionPageLink());

  const clickHomeLink = async () => await waitForUserClick(HomeLink());
  return {
    MainTitleHeading,
    MainPageStartLink,
    SpentTimeDiv,
    CorrectAnswerCountDiv,
    WrongAnswerCountDiv,
    WrongAnsweredQuestionTitleDiv,
    WrongAnsweredQuestionPageLink,
    WrongAnsweredQuestionHeading,
    HomeLink,
    FirstQuestionTitleHeading,
    QuestionAnswersList,
    FirstQuestionCorrectAnswer,
    CorrectCaseModalDiv,
    WrongCaseModalDiv,
    CorrectAnswerInWrongCaseModalDiv,
    ModalNextButton,
    SecondQuestionTitleHeading,
    SecondQuestionWrongAnswer,
    NavBar,
    clickMainPageStartLink,
    clickFirstQuestionCorrectAnswer,
    clickModalNextButton,
    clickSecondQuestionWrongAnswer,
    clickWrongAnsweredQuestionPageLink,
    clickHomeLink,
  };
}
