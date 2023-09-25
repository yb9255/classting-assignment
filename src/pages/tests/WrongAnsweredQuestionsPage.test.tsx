import {
  SHORT_MOCK_WRONG_ANSWERED_QUESTIONS,
  LONG_MOCK_WRONG_ANSWERED_QUESTIONS,
} from './mocks';
import { LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID } from '../../constants';
import { renderWrongAnsweredQuestionsPage } from './helpers';

describe('WrongAnsweredQuestionsPage', () => {
  window.scrollTo = jest.fn();

  beforeEach(() => {
    localStorage.setItem(
      LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID,
      JSON.stringify(SHORT_MOCK_WRONG_ANSWERED_QUESTIONS)
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('shows wrong questions title', () => {
    const { getWrongAnsweredQuestionHeading } =
      renderWrongAnsweredQuestionsPage();

    const wrongAnsweredQuestionsHeading = getWrongAnsweredQuestionHeading();
    expect(wrongAnsweredQuestionsHeading).toBeInTheDocument();
  });

  it('shows all wrong questions in history when there are under 5 questions', () => {
    const { getFirstQuestionTitleDiv, getSecondQuestionTitleDiv } =
      renderWrongAnsweredQuestionsPage();

    const firstQuestionTitleDiv = getFirstQuestionTitleDiv();
    const secondQuestionTitleDiv = getSecondQuestionTitleDiv();

    expect(firstQuestionTitleDiv).toBeInTheDocument();
    expect(secondQuestionTitleDiv).toBeInTheDocument();
  });

  it('shows chosen answer that was wrong', () => {
    const { getChosenAnswerDivList } = renderWrongAnsweredQuestionsPage();

    const chosenAnswerDivList = getChosenAnswerDivList();
    expect(chosenAnswerDivList.length > 0).toBe(true);
  });

  it('shows correct answer that was not chosen', () => {
    const { getCorrectAnswerDivList } = renderWrongAnsweredQuestionsPage();

    const correctAnswerDivList = getCorrectAnswerDivList();
    expect(correctAnswerDivList.length > 0).toBe(true);
  });

  it('shows list of answers', () => {
    const TOTAL_LIST_ITEMS_OF_ALL_WRONG_QUESTIONS = 8;
    const { getTotalAnswersList } = renderWrongAnsweredQuestionsPage();

    const totalAnswersList = getTotalAnswersList();

    expect(totalAnswersList).toHaveLength(
      TOTAL_LIST_ITEMS_OF_ALL_WRONG_QUESTIONS
    );
  });

  it('shows there is no wrong answered questions in history', () => {
    localStorage.clear();

    const { getNoWrongAnsweredQuestionHeading } =
      renderWrongAnsweredQuestionsPage();

    const noWrongAnsweredQuestionHeading = getNoWrongAnsweredQuestionHeading();
    expect(noWrongAnsweredQuestionHeading).toBeInTheDocument();
  });

  it('shows only 5 question per page', () => {
    localStorage.setItem(
      LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID,
      JSON.stringify(LONG_MOCK_WRONG_ANSWERED_QUESTIONS)
    );

    const { getWrongAnsweredQuestionTitleList } =
      renderWrongAnsweredQuestionsPage();

    const wrongAnsweredQuestionTitleList = getWrongAnsweredQuestionTitleList();
    expect(wrongAnsweredQuestionTitleList).toHaveLength(5);
  });

  it('changes pages and cards based on pagination when user clicksq pagination button', async () => {
    localStorage.setItem(
      LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID,
      JSON.stringify(LONG_MOCK_WRONG_ANSWERED_QUESTIONS)
    );

    const {
      getPrevButton,
      getNextButton,
      findWrongAnsweredQuestionTitleList,
      waitForUserClick,
    } = renderWrongAnsweredQuestionsPage();

    const prevButton = getPrevButton();
    const nextButton = getNextButton();

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    await waitForUserClick(nextButton);

    const wrongAnsweredQuestionTitleListOnSecondPage =
      await findWrongAnsweredQuestionTitleList();

    expect(wrongAnsweredQuestionTitleListOnSecondPage).toHaveLength(2);

    await waitForUserClick(nextButton);

    const wrongAnsweredQuestionTitleListOnSecondPage2 =
      await findWrongAnsweredQuestionTitleList();

    expect(wrongAnsweredQuestionTitleListOnSecondPage).toEqual(
      wrongAnsweredQuestionTitleListOnSecondPage2
    );

    await waitForUserClick(prevButton);

    const wrongAnswerQuestionTitleListOnFirstPage =
      await findWrongAnsweredQuestionTitleList();

    expect(wrongAnswerQuestionTitleListOnFirstPage).toHaveLength(5);

    await waitForUserClick(prevButton);

    const wrongAnswerQuestionTitleListOnFirstPage2 =
      await findWrongAnsweredQuestionTitleList();

    expect(wrongAnswerQuestionTitleListOnFirstPage2).toEqual(
      wrongAnswerQuestionTitleListOnFirstPage2
    );
  });
});
