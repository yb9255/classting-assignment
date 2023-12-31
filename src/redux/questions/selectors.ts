import { RootState } from '../store';

export const getIsLoading = (state: RootState) => state.questions.isLoading;
export const getQuestions = (state: RootState) => state.questions.questions;

export const getStartTime = (state: RootState) => state.questions.startTime;
export const getEndTime = (state: RootState) => state.questions.endTime;

export const getCorrectAnsweredQuestions = (state: RootState) =>
  state.questions.correctAnsweredQuestions;

export const getWrongAnsweredQuestions = (state: RootState) =>
  state.questions.wrongAnsweredQuestions;

export const getError = (state: RootState) => state.questions.error;
