import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchQuestions,
  fetchQuestionsSuccess,
  fetchQuestionFailure,
} from '../questions/reducer';
import axios, { type AxiosResponse } from 'axios';
import { QuestionType } from '../questions/types';
import { DB_API_URL } from '../../constants';

type ExpectedAxiosResponse = AxiosResponse<{
  response_code: number;
  results: QuestionType[];
}>;

function* watchFetchQuestions() {
  const query = '?amount=10&category=11&type=multiple';
  const questionsResponse: ExpectedAxiosResponse = yield call(() =>
    axios.get(`${DB_API_URL}${query}`)
  );

  if (questionsResponse.data.response_code === 0) {
    yield put(fetchQuestionsSuccess(questionsResponse));
  } else {
    yield put(fetchQuestionFailure({ data: { error: 'ERROR' } }));
  }
}

export default function* watch() {
  yield takeLatest(fetchQuestions.type, watchFetchQuestions);
}
