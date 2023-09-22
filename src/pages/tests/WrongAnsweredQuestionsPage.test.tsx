import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { decodeHtmlString } from '../../helpers';
import { screen, render } from '../../test-utils';
import WrongAnsweredQuestionsPage, {
  WrongAnsweredQuestionType,
} from '../WrongAnsweredQuestionsPage';

const TOTAL_LIST_ITEMS_OF_ALL_WRONG_QUESTIONS = 8;

describe('WrongAnsweredQuestionsPage', () => {
  beforeAll(() => {
    const testWrongAnsweredQuestions: WrongAnsweredQuestionType[] = [
      {
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

    localStorage.setItem(
      'wrong-questions',
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

    const pageTitle = screen.getByRole('heading', { name: '오답노트' });

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
      )
    );

    const secondQuestionTitleDiv = screen.getByText(
      decodeHtmlString(
        'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
      )
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

    const chosenAnswerDiv = screen.getByText(decodeHtmlString('Closer'));
    expect(chosenAnswerDiv).toHaveTextContent('선택한 오답');
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

    const correctAnswerDiv = screen.getByText(decodeHtmlString('Hurt'));
    expect(correctAnswerDiv).toHaveTextContent('정답');
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
});
