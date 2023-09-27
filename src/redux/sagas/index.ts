import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchQuestions,
  fetchQuestionsSuccess,
  fetchQuestionFailure,
} from '../questions/reducer';
import { OriginalQuestionType } from '../questions/types';
import { DB_API_URL } from '../../constants';

type ResponseBody = {
  response_code: number;
  results: OriginalQuestionType[];
};

export function* watchFetchQuestions() {
  const query = '?amount=10&category=11&type=multiple';

  try {
    const questionsResponse: Response = yield call(() =>
      fetch(`${DB_API_URL}${query}`)
    );

    const questionResponseBody: ResponseBody = yield questionsResponse.json();

    const isSuccess = questionResponseBody.response_code <= 1;

    if (isSuccess) {
      yield put(
        fetchQuestionsSuccess({
          results: questionResponseBody.results,
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
