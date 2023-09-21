export type OriginalQuestionType = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuestionType = {
  id: number;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
  answers: string[];
};

export type InitialState = {
  isLoading: boolean;
  questions: QuestionType[];
  correctAnswerCount: number;
  wrongAnswerCount: number;
  error: null | 'ERROR';
};
