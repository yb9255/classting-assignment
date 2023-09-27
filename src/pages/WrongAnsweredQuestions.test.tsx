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
      'In &quot;Sonic the Hedgehog3 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
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
      'Johnny Cash did a cover5 of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
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
      'In &quot;Sonic the Hedge6hog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
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
      'Johnny Cash did a cover 7of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
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
      'In &quot;Sonic the 8Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
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
      'Johnny Cash did a cover o2f this song written by lead singer of Nine Inch Nails, Trent Reznor.'
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
    const { WrongAnsweredQuestionHeading } = renderWrongAnsweredQuestionsPage();
    expect(WrongAnsweredQuestionHeading()).toBeInTheDocument();
  });

  it('히스토리 내 오답이 5개 이하인 경우, 모든 오답을 보여줍니다.', () => {
    const { FirstQuestionTitleDiv, SecondQuestionTitleDiv } =
      renderWrongAnsweredQuestionsPage();

    expect(FirstQuestionTitleDiv()).toBeInTheDocument();
    expect(SecondQuestionTitleDiv()).toBeInTheDocument();
  });

  it('사용자가 해당 문제를 풀었을 때 선택한 답지를 보여줍니다.', () => {
    const { ChosenAnswerDivList } = renderWrongAnsweredQuestionsPage();
    expect(ChosenAnswerDivList().length > 0).toBe(true);
  });

  it('각 문제에 대한 정답을 보여줍니다.', () => {
    const { CorrectAnswerDivList } = renderWrongAnsweredQuestionsPage();
    expect(CorrectAnswerDivList().length > 0).toBe(true);
  });

  it('각 문제의 모든 선지를 보여줍니다.', () => {
    const TOTAL_LIST_ITEMS_OF_ALL_WRONG_QUESTIONS = 8;
    const { TotalAnswersList } = renderWrongAnsweredQuestionsPage();

    expect(TotalAnswersList()).toHaveLength(
      TOTAL_LIST_ITEMS_OF_ALL_WRONG_QUESTIONS
    );
  });

  it('오답 히스토리가 없을 경우, 오답이 없다는 메세지를 보여줍니다.', () => {
    localStorage.clear();

    const { NoWrongAnsweredQuestionHeading } =
      renderWrongAnsweredQuestionsPage();

    expect(NoWrongAnsweredQuestionHeading()).toBeInTheDocument();
  });

  it('오답 히스토리에 있는 문제가 5개를 초과할 경우에, 첫 페이지에서 5문제만 보여줍니다.', () => {
    localStorage.setItem(
      LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID,
      JSON.stringify(LONG_MOCK_WRONG_ANSWERED_QUESTIONS)
    );

    const { WrongAnsweredQuestionTitleList } =
      renderWrongAnsweredQuestionsPage();

    expect(WrongAnsweredQuestionTitleList()).toHaveLength(5);
  });

  it('< 혹은 > 버튼을 누르면 이전 혹은 다음 문제들을 보여줍니다. 페이지의 시작에서는 < 버튼이, 끝에서는 > 버튼이 동작하지 않습니다.', async () => {
    localStorage.setItem(
      LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID,
      JSON.stringify(LONG_MOCK_WRONG_ANSWERED_QUESTIONS)
    );

    const {
      PrevButton,
      NextButton,
      FirstQuestionTitleDivAsync,
      LastQuestionTitleDivOnLongList,
      clickPrevButton,
      clickNextButton,
      WrongAnsweredQuestionTitleListAsync,
    } = renderWrongAnsweredQuestionsPage();

    expect(PrevButton()).toBeInTheDocument();
    expect(NextButton()).toBeInTheDocument();

    await clickNextButton();

    expect(await WrongAnsweredQuestionTitleListAsync()).toHaveLength(2);
    expect(await LastQuestionTitleDivOnLongList()).toBeInTheDocument();

    await clickNextButton();

    expect(await WrongAnsweredQuestionTitleListAsync()).toHaveLength(2);
    expect(await LastQuestionTitleDivOnLongList()).toBeInTheDocument();

    await clickPrevButton();

    expect(await WrongAnsweredQuestionTitleListAsync()).toHaveLength(5);
    expect(await FirstQuestionTitleDivAsync()).toBeInTheDocument();

    await clickPrevButton();

    expect(await WrongAnsweredQuestionTitleListAsync()).toHaveLength(5);
    expect(await FirstQuestionTitleDivAsync()).toBeInTheDocument();
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

  const WrongAnsweredQuestionHeading = () =>
    screen.getByRole('heading', { name: '오답 노트' });

  const FirstQuestionTitleDiv = () =>
    screen.getByText(
      decodeHtmlString(
        'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
      ),
      { exact: false }
    );

  const FirstQuestionTitleDivAsync = () =>
    screen.findByText(
      decodeHtmlString(
        'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
      ),
      { exact: false }
    );

  const SecondQuestionTitleDiv = () =>
    screen.getByText(
      decodeHtmlString(
        'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
      ),
      { exact: false }
    );

  const ChosenAnswerDivList = () =>
    screen.getAllByText(`선택한 오답: `, {
      exact: false,
    });

  const CorrectAnswerDivList = () =>
    screen.getAllByText('정답:', { exact: false });

  const TotalAnswersList = () => screen.getAllByRole('listitem');

  const NoWrongAnsweredQuestionHeading = () =>
    screen.getByRole('heading', {
      name: '오답 기록이 없습니다.',
    });

  const WrongAnsweredQuestionTitleList = () =>
    screen.getAllByText('문제', {
      exact: false,
    });

  const PrevButton = () => screen.getByRole('button', { name: '<' });
  const NextButton = () => screen.getByRole('button', { name: '>' });

  const WrongAnsweredQuestionTitleListAsync = () =>
    screen.findAllByText('문제', {
      exact: false,
    });

  const LastQuestionTitleDivOnLongList = () =>
    screen.findByText(
      decodeHtmlString(
        'Johnny Cash did a cover o2f this song written by lead singer of Nine Inch Nails, Trent Reznor.'
      ),
      { exact: false }
    );

  const waitForUserClick = async (targetElement: Element) => {
    const user = userEvent.setup();

    await waitFor(async () => {
      await user.click(targetElement);
    });
  };

  const clickPrevButton = async () => await waitForUserClick(PrevButton());
  const clickNextButton = async () => await waitForUserClick(NextButton());

  return {
    WrongAnsweredQuestionHeading,
    FirstQuestionTitleDiv,
    FirstQuestionTitleDivAsync,
    SecondQuestionTitleDiv,
    ChosenAnswerDivList,
    CorrectAnswerDivList,
    TotalAnswersList,
    NoWrongAnsweredQuestionHeading,
    WrongAnsweredQuestionTitleList,
    PrevButton,
    NextButton,
    WrongAnsweredQuestionTitleListAsync,
    LastQuestionTitleDivOnLongList,
    clickPrevButton,
    clickNextButton,
  };
}

export default renderWrongAnsweredQuestionsPage;
