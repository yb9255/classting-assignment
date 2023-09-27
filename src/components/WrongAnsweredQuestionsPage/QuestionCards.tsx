import { styled } from 'styled-components';
import type { WrongAnsweredQuestionType } from '../../types';
import QuestionCard from '../QuestionCard';
import QuestionAnswers from './QuestionAnswers';

type Props = {
  questions: WrongAnsweredQuestionType[];
};

function QuestionCards({ questions }: Props) {
  return (
    <>
      {questions.map((question) => (
        <QuestionCard key={question.id}>
          <QuestionTitle>문제: {question.question}</QuestionTitle>
          <AnswerInfoBox>선택한 오답: {question.chosenAnswer}</AnswerInfoBox>
          <AnswerInfoBox>정답: {question.correctAnswer}</AnswerInfoBox>
          <QuestionAnswers question={question} />
        </QuestionCard>
      ))}
    </>
  );
}

const QuestionTitle = styled.h3`
  font-size: 20px;
  width: 100%;
  word-wrap: break-word;
`;

const AnswerInfoBox = styled.div`
  margin-bottom: 10px;
  word-wrap: break-word;
`;

export default QuestionCards;
