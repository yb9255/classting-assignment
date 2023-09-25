import renderApp from './renderApp';

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
