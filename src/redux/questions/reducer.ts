import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitialState, OriginalQuestionType, QuestionType } from './types';
import { shuffleArray } from '../../helpers';

const initialState: InitialState = {
  isLoading: false,
  questions: [],
  correctAnsweredQuestions: [],
  wrongAnsweredQuestions: [],
  error: null,
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    fetchQuestions: (state) => {
      state.isLoading = true;
    },
    fetchQuestionsSuccess: (
      state,
      action: PayloadAction<{
        results: OriginalQuestionType[];
      }>
    ) => {
      state.isLoading = false;

      const filteredQuestions: QuestionType[] = [];

      action.payload.results.forEach((result, index) => {
        filteredQuestions.push({
          type: result.type,
          difficulty: result.difficulty,
          category: result.category,
          question: result.question,
          correctAnswer: result.correct_answer,
          answers: shuffleArray([
            result.correct_answer,
            ...result.incorrect_answers,
          ]),
        });
      });

      state.questions = filteredQuestions;
    },
    fetchQuestionFailure: (
      state,
      action: PayloadAction<{ data: { error: 'ERROR' } }>
    ) => {
      state.isLoading = false;
      state.error = action.payload.data.error;
    },
    increaseCorrectAnsweredQuestions: (
      state,
      action: PayloadAction<QuestionType>
    ) => {
      state.correctAnsweredQuestions.push(action.payload);
    },
    increaseWrongAnsweredQuestions: (
      state,
      action: PayloadAction<QuestionType>
    ) => {
      state.wrongAnsweredQuestions.push(action.payload);
    },
    initError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchQuestions,
  fetchQuestionsSuccess,
  fetchQuestionFailure,
  increaseCorrectAnsweredQuestions,
  increaseWrongAnsweredQuestions,
  initError,
} = questionsSlice.actions;

export default questionsSlice.reducer;
