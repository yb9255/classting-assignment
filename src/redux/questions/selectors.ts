import { RootState } from '../store';

export const getIsLoading = (state: RootState) => state.questions.isLoading;
export const getQuestions = (state: RootState) => state.questions.questions;

export const getCorrectAnswerCount = (state: RootState) =>
  state.questions.correctAnswerCount;

export const getWrongAnswerCount = (state: RootState) =>
  state.questions.wrongAnswerCount;

export const getError = (state: RootState) => state.questions.error;
