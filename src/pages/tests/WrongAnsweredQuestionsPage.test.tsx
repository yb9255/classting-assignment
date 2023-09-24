import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { decodeHtmlString } from '../../helpers';
import { screen, render } from '../../test-utils';
import WrongAnsweredQuestionsPage, {
  WrongAnsweredQuestionType,
} from '../WrongAnsweredQuestionsPage';

const TOTAL_LIST_ITEMS_OF_ALL_WRONG_QUESTIONS = 8;

const testWrongAnsweredQuestions: WrongAnsweredQuestionType[] = [
  {
    id: 'abcd',
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
    id: 'efgh',
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
  beforeAll(() => {
    localStorage.setItem(
      'wrong-answered-questions',
      JSON.stringify(testWrongAnsweredQuestions)
    );
  });

  afterAll(() => {
    localStorage.clear();
  });

  it('shows wrong questions title', () => {
    render(
      <MemoryRouter initialEntries={['/wrong-answered-questions']}>
        <Routes>
          <Route
            path="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    const pageTitle = screen.getByRole('heading', { name: '오답 노트' });

    expect(pageTitle).toBeInTheDocument();
  });

  it('shows all wrong questions in history', () => {
    render(
      <MemoryRouter initialEntries={['/wrong-answered-questions']}>
        <Routes>
          <Route
            path="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    const firstQuestionTitleDiv = screen.getByText(
      decodeHtmlString(
        'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
      ),
      { exact: false }
    );

    const secondQuestionTitleDiv = screen.getByText(
      decodeHtmlString(
        'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
      ),
      { exact: false }
    );

    expect(firstQuestionTitleDiv).toBeInTheDocument();
    expect(secondQuestionTitleDiv).toBeInTheDocument();
  });

  it('shows chosen answer that was wrong', () => {
    render(
      <MemoryRouter initialEntries={['/wrong-answered-questions']}>
        <Routes>
          <Route
            path="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    const chosenAnswerDiv = screen.getByText(
      `선택한 오답: ${decodeHtmlString('Closer')}`
    );

    expect(chosenAnswerDiv).toBeInTheDocument();
  });

  it('shows correct answer that was not chosen', () => {
    render(
      <MemoryRouter initialEntries={['/wrong-answered-questions']}>
        <Routes>
          <Route
            path="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    const correctAnswerDiv = screen.getByText(
      `정답: ${decodeHtmlString('Hurt')}`
    );

    expect(correctAnswerDiv).toBeInTheDocument();
  });

  it('shows list of answers', () => {
    render(
      <MemoryRouter initialEntries={['/wrong-answered-questions']}>
        <Routes>
          <Route
            path="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    const totalAnswersList = screen.getAllByRole('listitem');
    expect(totalAnswersList).toHaveLength(
      TOTAL_LIST_ITEMS_OF_ALL_WRONG_QUESTIONS
    );
  });

  it('shows there is no wrong answered questions in history', () => {
    localStorage.clear();

    render(
      <MemoryRouter initialEntries={['/wrong-answered-questions']}>
        <Routes>
          <Route
            path="/wrong-answered-questions"
            element={<WrongAnsweredQuestionsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    const noWrongAnsweredQuestionHeading = screen.getByRole('heading', {
      name: '오답 기록이 없습니다.',
    });
    expect(noWrongAnsweredQuestionHeading).toBeInTheDocument();

    localStorage.setItem(
      'wrong-answered-questions',
      JSON.stringify(testWrongAnsweredQuestions)
    );
  });
});
