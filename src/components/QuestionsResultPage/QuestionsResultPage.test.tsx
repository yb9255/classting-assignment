import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { screen, render } from '../../utils/test/test-utils';

import { decodeHtmlString } from '../../utils';
import { InitialState } from '../../redux/questions/types';
import QuestionsResult from './QuestionsResultPage';

const MOCK_CORRECT_ANSWERED_QUESTION_LIST = [
  {
    category: 'Entertainment: Video Games',
    type: 'multiple',
    difficulty: 'hard',
    question: decodeHtmlString(
      'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?'
    ),
    correctAnswer: decodeHtmlString('The Lead Programmer&#039;s birthday'),
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
];

const MOCK_WRONG_ANSWERED_QUESTION_LIST = [
  {
    category: 'Entertainment: Music',
    type: 'multiple',
    difficulty: 'medium',
    question: decodeHtmlString(
      'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.'
    ),
    correctAnswer: 'Hurt',
    answers: ['Closer', 'A Warm Place', 'Big Man with a Gun'],
  },
];

describe('QuestionResult', () => {
  it("사용자가 문제를 다 풀었을 때, '문제 결과' 타이틀을 보여준다.", async () => {
    const { QuestionsResultHeading } = renderQuestionsResultPage();

    expect(QuestionsResultHeading()).toBeInTheDocument();
  });

  it('문제 소요 시간의 mm:ss 포맷으로 보여준다.', () => {
    const { SpentTimeDiv } = renderQuestionsResultPage({
      preloadedState: {
        questions: {
          startTime: 0,
          endTime: 650000,
        },
      },
    });

    expect(SpentTimeDiv()).toHaveTextContent('10:50');
  });

  it('정답, 오답 갯수를 화면에 보여준다.', async () => {
    const { CorrectAnswerCountDiv, WrongAnswerCountDiv } =
      renderQuestionsResultPage({
        preloadedState: {
          questions: {
            startTime: 0,
            endTime: 500,
            correctAnsweredQuestions: MOCK_CORRECT_ANSWERED_QUESTION_LIST,
            wrongAnsweredQuestions: MOCK_WRONG_ANSWERED_QUESTION_LIST,
          },
        },
      });

    expect(CorrectAnswerCountDiv()).toHaveTextContent('1');
    expect(WrongAnswerCountDiv()).toHaveTextContent('1');
  });

  it('정답 / 오답 개수를 표시해주는 차트를 확인할 수 있다.', () => {
    const { CorrectAnswerBar, WrongAnswerBar } = renderQuestionsResultPage();

    expect(CorrectAnswerBar()).toBeInTheDocument();
    expect(WrongAnswerBar()).toBeInTheDocument();
  });

  it('홈 화면으로 향하는 링크를 가진 돌아가기 버튼을 화면에서 확인할 수 있다.', async () => {
    const { LinkToMainPage } = renderQuestionsResultPage();

    const linkToMainPage = LinkToMainPage();
    expect(linkToMainPage).toBeInTheDocument();
  });
});

type Props = {
  preloadedState?: { questions: Partial<InitialState> };
};

function renderQuestionsResultPage({
  preloadedState = {
    questions: {
      startTime: 0,
      endTime: 500,
    },
  },
}: Props = {}) {
  render(
    <MemoryRouter initialEntries={['/questions-result']}>
      <Routes>
        <Route path="/questions-result" element={<QuestionsResult />} />
      </Routes>
    </MemoryRouter>,
    { preloadedState }
  );

  const QuestionsResultHeading = () =>
    screen.getByRole('heading', {
      name: '문제 결과',
    });

  const SpentTimeDiv = () => screen.getByText('소요 시간:', { exact: false });

  const CorrectAnswerCountDiv = () =>
    screen.getByText('정답 수:', {
      exact: false,
    });

  const WrongAnswerCountDiv = () =>
    screen.getByText('오답 수: ', {
      exact: false,
    });

  const LinkToMainPage = () => screen.getByRole('link', { name: '돌아가기' });
  const CorrectAnswerBar = () => screen.getByRole('정답');
  const WrongAnswerBar = () => screen.getByRole('오답');

  return {
    QuestionsResultHeading,
    SpentTimeDiv,
    CorrectAnswerCountDiv,
    WrongAnswerCountDiv,
    LinkToMainPage,
    CorrectAnswerBar,
    WrongAnswerBar,
  };
}
