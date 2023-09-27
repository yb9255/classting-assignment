import { styled } from 'styled-components';
import QuestionCard from '../QuestionCard';
import { QuestionType } from '../../redux/questions/types';
import QuestionAnswers from './QuestionAnswers';

type Props = {
  targetQuestion: QuestionType;
  currentQuestionIndex: number;
  onClickAnswer: (answer: string) => void;
};

function CurrentQuestionCard({
  targetQuestion,
  currentQuestionIndex,
  onClickAnswer,
}: Props) {
  return (
    <QuestionCard>
      <QuestionTitle>{`${currentQuestionIndex + 1}: ${
        targetQuestion.question
      }`}</QuestionTitle>
      <QuestionAnswers
        answers={targetQuestion.answers}
        onClickAnswer={onClickAnswer}
      />
    </QuestionCard>
  );
}

const QuestionTitle = styled.h3`
  font-size: 20px;
  width: 760px;
`;

export default CurrentQuestionCard;
