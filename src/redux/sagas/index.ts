import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchQuestions,
  fetchQuestionsSuccess,
  fetchQuestionFailure,
} from '../questions/reducer';
import axios, { type AxiosResponse } from 'axios';
import { OriginalQuestionType } from '../questions/types';
import { DB_API_URL } from '../../constants';

type ExpectedAxiosResponse = AxiosResponse<{
  response_code: number;
  results: OriginalQuestionType[];
}>;

export function* watchFetchQuestions() {
  const query = '?amount=10&category=11&type=multiple';

  try {
    const questionsResponse: ExpectedAxiosResponse = yield call(() =>
      axios.get(`${DB_API_URL}${query}`)
    );

    const isSuccess = questionsResponse.data.response_code <= 1;

    if (isSuccess) {
      yield put(
        fetchQuestionsSuccess({
          results: questionsResponse.data.results,
        })
      );
      return;
    }

    yield put(fetchQuestionFailure({ data: { error: 'ERROR' } }));
  } catch {
    yield put(fetchQuestionFailure({ data: { error: 'ERROR' } }));
  }
}

export default function* watch() {
  yield takeLatest(fetchQuestions.type, watchFetchQuestions);
}
