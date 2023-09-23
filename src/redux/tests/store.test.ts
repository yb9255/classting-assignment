import store from '../store';

import {
  fetchQuestionsSuccess,
  fetchQuestionFailure,
  increaseCorrectAnsweredQuestions,
  increaseWrongAnsweredQuestions,
  setStartTime,
  setEndTime,
  initTimes,
  initError,
} from '../questions/reducer';
import { decodeHtmlString } from '../../helpers';

const DUMMY_DATA = [
  {
    category: 'Entertainment: Video Games',
    type: 'multiple',
    difficulty: 'hard',
    question:
      'In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?',
    correct_answer: 'The Lead Programmer&#039;s birthday',
    incorrect_answers: [
      'The first release date of &quot;Sonic the Hedgehog&quot;',
      'The date Sonic Team was founded',
      'The first release date of &quot;Sonic the Hedgehog 2&quot;',
    ],
  },
  {
    category: 'Entertainment: Music',
    type: 'multiple',
    difficulty: 'medium',
    question:
      'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.',
    correct_answer: 'Hurt',
    incorrect_answers: ['Closer', 'A Warm Place', 'Big Man with a Gun'],
  },
];

const answer = {
  category: 'Entertainment: Music',
  type: 'multiple',
  difficulty: 'medium',
  question:
    'Johnny Cash did a cover of this song written by lead singer of Nine Inch Nails, Trent Reznor.',

  correctAnswer: 'Hurt',
  answers: ['Closer', 'A Warm Place', 'Big Man with a Gun'],
};

describe('Redux Toolkit Store Tests', () => {
  it('should initialize with the correct initial state', () => {
    const initialState = store.getState();

    expect(initialState.questions).toEqual({
      isLoading: false,
      questions: [],
      correctAnsweredQuestions: [],
      wrongAnsweredQuestions: [],
      error: null,
      startTime: 0,
      endTime: 0,
    });
  });

  it('should dispatch actions and update the state correctly', () => {
    store.dispatch({
      type: fetchQuestionsSuccess.type,
      payload: { results: DUMMY_DATA },
    });

    store.dispatch({
      type: fetchQuestionFailure.type,
      payload: { data: { error: 'ERROR' } },
    });

    store.dispatch({
      type: increaseCorrectAnsweredQuestions.type,
      payload: answer,
    });

    store.dispatch({
      type: increaseWrongAnsweredQuestions.type,
      payload: answer,
    });

    store.dispatch({
      type: setStartTime.type,
      payload: { startTime: 100 },
    });

    store.dispatch({
      type: setEndTime.type,
      payload: { endTime: 200 },
    });

    const updatedState = store.getState();

    expect(updatedState.questions.questions[0].correctAnswer).toEqual(
      decodeHtmlString(DUMMY_DATA[0].correct_answer)
    );

    expect(updatedState.questions.error).toEqual('ERROR');
    expect(updatedState.questions.correctAnsweredQuestions).toEqual([answer]);
    expect(updatedState.questions.wrongAnsweredQuestions).toEqual([answer]);
    expect(updatedState.questions.startTime).toEqual(100);
    expect(updatedState.questions.endTime).toEqual(200);

    store.dispatch({ type: initTimes.type });
    store.dispatch({ type: initError.type });

    const secondUpdatedState = store.getState();

    expect(secondUpdatedState.questions.error).toEqual(null);
    expect(secondUpdatedState.questions.startTime).toEqual(0);
    expect(secondUpdatedState.questions.endTime).toEqual(0);
  });
});
