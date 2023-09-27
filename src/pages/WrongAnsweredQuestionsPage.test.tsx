import { LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID } from '../constants';
import userEvent from '@testing-library/user-event';
import { screen, render, waitFor } from '../utils/test/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import WrongAnsweredQuestionsPage from './WrongAnsweredQuestionsPage';

import { decodeHtmlString } from '../utils';
import { WrongAnsweredQuestionType } from './WrongAnsweredQuestionsPage';

const SHORT_MOCK_WRONG_ANSWERED_QUESTIONS: WrongAnsweredQuestionType[] = [
  {
    id: '0',
    question: decodeHtmlString(
      'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
    ),
    correctAnswer: decodeHtmlString('The Lead Programmer&#039;s birthday'),
    chosenAnswer: decodeHtmlString(
      'The first release date of &quot;Sonic the Hedgehog&quot;'
    ),
    answers: [
      decodeHtmlString(
        'The first release date of &quot;Sonic the Hedgehog&quot;'
      ),
      decodeHtmlString('The date Sonic Team was founded'),
      decodeHtmlString(
        'The first release date of &quot;Sonic the Hedgehog 2&quot;'
      ),
      decodeHtmlString('The Lead Programmer&#039;s birthday'),
    ],
  },
  {
    id: '1',
    question: decodeHtmlString(
      'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
    ),
    correctAnswer: decodeHtmlString('Hurt'),
    chosenAnswer: decodeHtmlString('Closer'),
    answers: [
      decodeHtmlString('Closer'),
      decodeHtmlString('A Warm Place'),
      decodeHtmlString('Hurt'),
      decodeHtmlString('Big Man with a Gun'),
    ],
  },
];

const LONG_MOCK_WRONG_ANSWERED_QUESTIONS: WrongAnsweredQuestionType[] = [
  {
    id: '1',
    question: decodeHtmlString(
      'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
    ),
    correctAnswer: decodeHtmlString('The Lead Programmer&#039;s birthday'),
    chosenAnswer: decodeHtmlString(
      'The first release date of &quot;Sonic the Hedgehog&quot;'
    ),
    answers: [
      decodeHtmlString(
        'The first release date of &quot;Sonic the Hedgehog&quot;'
      ),
      decodeHtmlString('The date Sonic Team was founded'),
      decodeHtmlString(
        'The first release date of &quot;Sonic the Hedgehog 2&quot;'
      ),
      decodeHtmlString('The Lead Programmer&#039;s birthday'),
    ],
  },
  {
    id: '2',
    question: decodeHtmlString(
      'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
    ),
    correctAnswer: decodeHtmlString('The Lead Programmer&#039;s birthday'),
    chosenAnswer: decodeHtmlString(
      'The first release date of &quot;Sonic the Hedgehog&quot;'
    ),
    answers: [
      decodeHtmlString(
        'The first release date of &quot;Sonic the Hedgehog&quot;'
      ),
      decodeHtmlString('The date Sonic Team was founded'),
      decodeHtmlString(
        'The first release date of &quot;Sonic the Hedgehog 2&quot;'
      ),
      decodeHtmlString('The Lead Programmer&#039;s birthday'),
    ],
  },
  {
    id: '3',
    question: decodeHtmlString(
      'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
    ),
    correctAnswer: decodeHtmlString('Hurt'),
    chosenAnswer: decodeHtmlString('Closer'),
    answers: [
      decodeHtmlString('Closer'),
      decodeHtmlString('A Warm Place'),
      decodeHtmlString('Hurt'),
      decodeHtmlString('Big Man with a Gun'),
    ],
  },
  {
    id: '4',
    question: decodeHtmlString(
      'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
    ),
    correctAnswer: decodeHtmlString('The Lead Programmer&#039;s birthday'),
    chosenAnswer: decodeHtmlString(
      'The first release date of &quot;Sonic the Hedgehog&quot;'
    ),
    answers: [
      decodeHtmlString(
        'The first release date of &quot;Sonic the Hedgehog&quot;'
      ),
      decodeHtmlString('The date Sonic Team was founded'),
      decodeHtmlString(
        'The first release date of &quot;Sonic the Hedgehog 2&quot;'
      ),
      decodeHtmlString('The Lead Programmer&#039;s birthday'),
    ],
  },
  {
    id: '5',
    question: decodeHtmlString(
      'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
    ),
    correctAnswer: decodeHtmlString('Hurt'),
    chosenAnswer: decodeHtmlString('Closer'),
    answers: [
      decodeHtmlString('Closer'),
      decodeHtmlString('A Warm Place'),
      decodeHtmlString('Hurt'),
      decodeHtmlString('Big Man with a Gun'),
    ],
  },
  {
    id: '6',
    question: decodeHtmlString(
      'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
    ),
    correctAnswer: decodeHtmlString('The Lead Programmer&#039;s birthday'),
    chosenAnswer: decodeHtmlString(
      'The first release date of &quot;Sonic the Hedgehog&quot;'
    ),
    answers: [
      decodeHtmlString(
        'The first release date of &quot;Sonic the Hedgehog&quot;'
      ),
      decodeHtmlString('The date Sonic Team was founded'),
      decodeHtmlString(
        'The first release date of &quot;Sonic the Hedgehog 2&quot;'
      ),
      decodeHtmlString('The Lead Programmer&#039;s birthday'),
    ],
  },
  {
    id: '7',
    question: decodeHtmlString(
      'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
    ),
    correctAnswer: decodeHtmlString('Hurt'),
    chosenAnswer: decodeHtmlString('Closer'),
    answers: [
      decodeHtmlString('Closer'),
      decodeHtmlString('A Warm Place'),
      decodeHtmlString('Hurt'),
      decodeHtmlString('Big Man with a Gun'),
    ],
  },
];

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

type Props = {
  initialEntries?: string[];
};

function renderWrongAnsweredQuestionsPage({
  initialEntries = ['/wrong-answered-questions'],
}: Props = {}) {
  const user = userEvent.setup();

  render(
    <>
      <div id="overlay-root" />
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route
            path="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />
        </Routes>
      </MemoryRouter>
    </>
  );

  const getWrongAnsweredQuestionHeading = () =>
    screen.getByRole('heading', { name: '오답 노트' });

  const getFirstQuestionTitleDiv = () =>
    screen.getByText(
      decodeHtmlString(
        'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
      ),
      { exact: false }
    );

  const getSecondQuestionTitleDiv = () =>
    screen.getByText(
      decodeHtmlString(
        'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
      ),
      { exact: false }
    );

  const getChosenAnswerDivList = () =>
    screen.getAllByText(`선택한 오답: `, {
      exact: false,
    });

  const getCorrectAnswerDivList = () =>
    screen.getAllByText('정답:', { exact: false });

  const getTotalAnswersList = () => screen.getAllByRole('listitem');

  const getNoWrongAnsweredQuestionHeading = () =>
    screen.getByRole('heading', {
      name: '오답 기록이 없습니다.',
    });

  const getWrongAnsweredQuestionTitleList = () =>
    screen.getAllByText('문제', {
      exact: false,
    });

  const getPrevButton = () => screen.getByRole('button', { name: '<' });
  const getNextButton = () => screen.getByRole('button', { name: '>' });

  const findWrongAnsweredQuestionTitleList = () =>
    screen.findAllByText('문제', {
      exact: false,
    });

  const waitForUserClick = async (targetElement: Element) => {
    await waitFor(async () => {
      await user.click(targetElement);
    });
  };

  return {
    getWrongAnsweredQuestionHeading,
    getFirstQuestionTitleDiv,
    getSecondQuestionTitleDiv,
    getChosenAnswerDivList,
    getCorrectAnswerDivList,
    getTotalAnswersList,
    getNoWrongAnsweredQuestionHeading,
    getWrongAnsweredQuestionTitleList,
    getPrevButton,
    getNextButton,
    findWrongAnsweredQuestionTitleList,
    waitForUserClick,
  };
}

export default renderWrongAnsweredQuestionsPage;
