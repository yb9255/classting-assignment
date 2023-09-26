import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitialState, OriginalQuestionType, QuestionType } from './types';
import { decodeHtmlString, shuffleArray } from '../../utils';

const initialState: InitialState = {
  isLoading: false,
  questions: [],
  correctAnsweredQuestions: [],
  wrongAnsweredQuestions: [],
  error: null,
  startTime: 0,
  endTime: 0,
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

      action.payload.results.forEach((result) => {
        filteredQuestions.push({
          type: result.type,
          difficulty: result.difficulty,
          category: result.category,
          question: decodeHtmlString(result.question),
          correctAnswer: decodeHtmlString(result.correct_answer),
          answers: shuffleArray([
            decodeHtmlString(result.correct_answer),
            ...result.incorrect_answers.map((answer) =>
              decodeHtmlString(answer)
            ),
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
    setStartTime: (state, action: PayloadAction<{ startTime: number }>) => {
      state.startTime = action.payload.startTime;
    },
    setEndTime: (state, action: PayloadAction<{ endTime: number }>) => {
      state.endTime = action.payload.endTime;
    },
    initTimes: (state) => {
      state.startTime = 0;
      state.endTime = 0;
    },
    initError: (state) => {
      state.error = null;
    },
    initAnsweredQuestions: (state) => {
      state.correctAnsweredQuestions = [];
      state.wrongAnsweredQuestions = [];
    },
  },
});

export const {
  fetchQuestions,
  fetchQuestionsSuccess,
  fetchQuestionFailure,
  increaseCorrectAnsweredQuestions,
  increaseWrongAnsweredQuestions,
  setStartTime,
  setEndTime,
  initTimes,
  initError,
  initAnsweredQuestions,
} = questionsSlice.actions;

export default questionsSlice.reducer;
