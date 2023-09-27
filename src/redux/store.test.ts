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

  it('리덕스 저장소는 웹페이지가 처음 시작 될때 지정된 기본 상태값을 가진다.', () => {
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

  it('문제 정보를 서버에 요청하는 액션이 오면 로딩 state를 true로 변환한다.', () => {
    store.dispatch({
      type: fetchQuestions.type,
    });

    const updatedState = store.getState();

    expect(updatedState.questions.isLoading).toBe(true);
  });

  it('문제 정보를 서버에서 불러오는데 성공했다는 액션이 오면, 문제 state를 업데이트하고 로딩 state를 false로 변환한다.', () => {
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

  it('문제 정보를 서버에서 불러오는데 실패했다는 액션이 오면, 에러 state를 업데이트 하고 로딩 state를 false로 변환한다.', () => {
    store.dispatch({
      type: fetchQuestionFailure.type,
      payload: { data: { error: 'ERROR' } },
    });

    const updatedState = store.getState();

    expect(updatedState.questions.isLoading).toBe(false);
    expect(updatedState.questions.error).toEqual('ERROR');
  });

  it('사용자가 문제를 풀어서 정답을 맞추는 액션이 오면, 정답 array state에 해당 문제 정보를 push한다.', () => {
    store.dispatch({
      type: increaseCorrectAnsweredQuestions.type,
      payload: DUMMY_ANSWER,
    });

    const updatedState = store.getState();

    expect(updatedState.questions.correctAnsweredQuestions).toEqual([
      DUMMY_ANSWER,
    ]);
  });

  it('사용자가 문제를 풀어서 정답을 맞추지 못하는 액션이 오면, 오답 array state에 해당 문제 정보를 push한다.', () => {
    store.dispatch({
      type: increaseWrongAnsweredQuestions.type,
      payload: DUMMY_ANSWER,
    });

    const updatedState = store.getState();

    expect(updatedState.questions.wrongAnsweredQuestions).toEqual([
      DUMMY_ANSWER,
    ]);
  });

  it('문제 풀이 시작 시간을 갱신하는 액션이 오면, 시작 시간 state를 payload에 맞게 변경한다.', () => {
    store.dispatch({
      type: setStartTime.type,
      payload: { startTime: 100 },
    });

    const updatedState = store.getState();

    expect(updatedState.questions.startTime).toEqual(100);
  });

  it('문제 풀이 종료 시간을 갱신하는 액션이 오면, 종료 시간 state를 payload에 맞게 변경한다.', () => {
    store.dispatch({
      type: setEndTime.type,
      payload: { endTime: 200 },
    });

    const updatedState = store.getState();

    expect(updatedState.questions.endTime).toEqual(200);
  });

  it('initTimes 액션이 오면, 시작 시간 state와 종료 시간 state를 초기화 한다.', () => {
    store.dispatch({ type: initTimes.type });

    const updatedState = store.getState();

    expect(updatedState.questions.startTime).toEqual(0);
    expect(updatedState.questions.endTime).toEqual(0);
  });

  it('initError 액션이 오면, 에러 state를 초기화 한다.', () => {
    store.dispatch({ type: initError.type });

    const updatedState = store.getState();

    expect(updatedState.questions.error).toEqual(null);
  });
});
