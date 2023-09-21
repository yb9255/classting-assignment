import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitialState, OriginalQuestionType, QuestionType } from './types';
import { shuffleArray } from '../../helpers';

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
          id: index,
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
  },
});

export const { fetchQuestions, fetchQuestionsSuccess, fetchQuestionFailure } =
  questionsSlice.actions;

export default questionsSlice.reducer;
