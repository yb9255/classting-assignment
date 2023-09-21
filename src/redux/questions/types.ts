import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

export type QuestionType = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type InitialState = {
  isLoading: boolean;
  questions: QuestionType[];
  correctAnswerCount: number;
  wrongAnswerCount: number;
  error: null | 'ERROR';
};

export type ExpectedAxiosPayloadAction = PayloadAction<
  AxiosResponse<{
    response_code: number;
    results: QuestionType[];
  }>
>;
