import {
  fetchQuestions,
  fetchQuestionsSuccess,
  fetchQuestionFailure,
  increaseCorrectAnsweredQuestions,
  increaseWrongAnsweredQuestions,
  setStartTime,
  setEndTime,
  initTimes,
  initError,
} from './questions/reducer';
import { DUMMY_ANSWER, DUMMY_QUESTIONS } from './store.mock';
import { decodeHtmlString } from '../utils';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import questionsSliceReducer from './questions/reducer';
import watch from './sagas';

describe('Redux Toolkit Store', () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: {
      questions: questionsSliceReducer,
    },
    middleware: (getDefaultMiddleware) => [
      sagaMiddleware,
      ...getDefaultMiddleware(),
    ],
  });

  sagaMiddleware.run(watch);

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

  it('updates isLoading type when gets fetchQuestion action', () => {
    store.dispatch({
      type: fetchQuestions.type,
    });

    const updatedState = store.getState();

    expect(updatedState.questions.isLoading).toBe(true);
  });

  it('updates questions and loading state when gets fetchQuestionSuccess type', () => {
    store.dispatch({
      type: fetchQuestionsSuccess.type,
      payload: { results: DUMMY_QUESTIONS },
    });

    const updatedState = store.getState();

    expect(updatedState.questions.isLoading).toBe(false);
    expect(updatedState.questions.questions[0].question).toEqual(
      decodeHtmlString(DUMMY_QUESTIONS[0].question)
    );
  });

  it('updates error and loading state when gets fetchQuestionFailure type', () => {
    store.dispatch({
      type: fetchQuestionFailure.type,
      payload: { data: { error: 'ERROR' } },
    });

    const updatedState = store.getState();

    expect(updatedState.questions.isLoading).toBe(false);
    expect(updatedState.questions.error).toEqual('ERROR');
  });

  it('push new question to correctAnsweredQuestions array state when gets increaseCorrectAnsweredQuestions type', () => {
    store.dispatch({
      type: increaseCorrectAnsweredQuestions.type,
      payload: DUMMY_ANSWER,
    });

    const updatedState = store.getState();

    expect(updatedState.questions.correctAnsweredQuestions).toEqual([
      DUMMY_ANSWER,
    ]);
  });

  it('push new question to wrongAnsweredQuestions array state when gets increaseWrongAnsweredQuestions type', () => {
    store.dispatch({
      type: increaseWrongAnsweredQuestions.type,
      payload: DUMMY_ANSWER,
    });

    const updatedState = store.getState();

    expect(updatedState.questions.wrongAnsweredQuestions).toEqual([
      DUMMY_ANSWER,
    ]);
  });

  it('updates startTime when gets setStartTime action', () => {
    store.dispatch({
      type: setStartTime.type,
      payload: { startTime: 100 },
    });

    const updatedState = store.getState();

    expect(updatedState.questions.startTime).toEqual(100);
  });

  it('updates endTime when gets setEndTime action', () => {
    store.dispatch({
      type: setEndTime.type,
      payload: { endTime: 200 },
    });

    const updatedState = store.getState();

    expect(updatedState.questions.endTime).toEqual(200);
  });

  it('reset startTime and endTime when gets initTimes action', () => {
    store.dispatch({ type: initTimes.type });

    const updatedState = store.getState();

    expect(updatedState.questions.startTime).toEqual(0);
    expect(updatedState.questions.endTime).toEqual(0);
  });

  it('resets error to null when gets initError action', () => {
    store.dispatch({ type: initError.type });

    const updatedState = store.getState();

    expect(updatedState.questions.error).toEqual(null);
  });
});
