import { LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID } from '../constants';
import userEvent from '@testing-library/user-event';
import { screen, render, waitFor } from '../utils/test/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import WrongAnsweredQuestionsPage from './WrongAnsweredQuestions';

import { decodeHtmlString } from '../utils';
import type { WrongAnsweredQuestionType } from '../types';

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

  it('페이지 진입 시, 오답 노트 타이틀을 보여줍니다.', () => {
    const { getWrongAnsweredQuestionHeading } =
      renderWrongAnsweredQuestionsPage();

    const wrongAnsweredQuestionsHeading = getWrongAnsweredQuestionHeading();
    expect(wrongAnsweredQuestionsHeading).toBeInTheDocument();
  });

  it('히스토리 내 오답이 5개 이하인 경우, 모든 오답을 보여줍니다.', () => {
    const { getFirstQuestionTitleDiv, getSecondQuestionTitleDiv } =
      renderWrongAnsweredQuestionsPage();

    const firstQuestionTitleDiv = getFirstQuestionTitleDiv();
    const secondQuestionTitleDiv = getSecondQuestionTitleDiv();

    expect(firstQuestionTitleDiv).toBeInTheDocument();
    expect(secondQuestionTitleDiv).toBeInTheDocument();
  });

  it('사용자가 해당 문제를 풀었을 때 선택한 답지를 보여줍니다.', () => {
    const { getChosenAnswerDivList } = renderWrongAnsweredQuestionsPage();

    const chosenAnswerDivList = getChosenAnswerDivList();
    expect(chosenAnswerDivList.length > 0).toBe(true);
  });

  it('각 문제에 대한 정답을 보여줍니다.', () => {
    const { getCorrectAnswerDivList } = renderWrongAnsweredQuestionsPage();

    const correctAnswerDivList = getCorrectAnswerDivList();
    expect(correctAnswerDivList.length > 0).toBe(true);
  });

  it('각 문제의 모든 선지를 보여줍니다.', () => {
    const TOTAL_LIST_ITEMS_OF_ALL_WRONG_QUESTIONS = 8;
    const { getTotalAnswersList } = renderWrongAnsweredQuestionsPage();

    const totalAnswersList = getTotalAnswersList();

    expect(totalAnswersList).toHaveLength(
      TOTAL_LIST_ITEMS_OF_ALL_WRONG_QUESTIONS
    );
  });

  it('오답 히스토리가 없을 경우, 오답이 없다는 메세지를 보여줍니다.', () => {
    localStorage.clear();

    const { getNoWrongAnsweredQuestionHeading } =
      renderWrongAnsweredQuestionsPage();

    const noWrongAnsweredQuestionHeading = getNoWrongAnsweredQuestionHeading();
    expect(noWrongAnsweredQuestionHeading).toBeInTheDocument();
  });

  it('오답 히스토리에 있는 문제가 5개를 초과할 경우에, 첫 페이지에서 5문제만 보여줍니다.', () => {
    localStorage.setItem(
      LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID,
      JSON.stringify(LONG_MOCK_WRONG_ANSWERED_QUESTIONS)
    );

    const { getWrongAnsweredQuestionTitleList } =
      renderWrongAnsweredQuestionsPage();

    const wrongAnsweredQuestionTitleList = getWrongAnsweredQuestionTitleList();
    expect(wrongAnsweredQuestionTitleList).toHaveLength(5);
  });

  it('< 혹은 > 버튼을 누르면 이전 혹은 다음 문제들을 보여줍니다. 페이지의 시작에서는 < 버튼이, 끝에서는 > 버튼이 동작하지 않습니다.', async () => {
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

function renderWrongAnsweredQuestionsPage() {
  render(
    <>
      <div id="overlay-root" />
      <MemoryRouter initialEntries={['/wrong-answered-questions']}>
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
    const user = userEvent.setup();

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
