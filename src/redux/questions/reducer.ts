import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ExpectedAxiosPayloadAction, InitialState } from './types';

const initialState: InitialState = {
  isLoading: false,
  questions: [],
  correctAnswerCount: 0,
  wrongAnswerCount: 0,
  error: null,
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    fetchQuestions: (state) => {
      state.isLoading = true;
    },
    fetchQuestionsSuccess: (state, action: ExpectedAxiosPayloadAction) => {
      state.isLoading = false;
      state.questions = action.payload.data.results;
    },
    fetchQuestionFailure: (
      state,
      action: PayloadAction<{ data: { error: 'ERROR' } }>
    ) => {
      state.isLoading = false;
      state.error = action.payload.data.error;
    },
  },
});

export const { fetchQuestions, fetchQuestionsSuccess, fetchQuestionFailure } =
  questionsSlice.actions;

export default questionsSlice.reducer;
