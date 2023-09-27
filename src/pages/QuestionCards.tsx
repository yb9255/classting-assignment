import { styled } from 'styled-components';
import type { WrongAnsweredQuestionType } from './WrongAnsweredQuestionsPage';
import { QuestionCard } from '../components';

type Props = {
  questions: WrongAnsweredQuestionType[];
};

function QuestionCards({ questions }: Props) {
  return (
    <>
      {questions.map((question) => (
        <QuestionCard key={question.id}>
          <QuestionHeading>문제: {question.question}</QuestionHeading>
          <AnswerInfoBox>선택한 오답: {question.chosenAnswer}</AnswerInfoBox>
          <AnswerInfoBox>정답: {question.correctAnswer}</AnswerInfoBox>
          <QuestionAnswersWrapper>
            <h4>답지 리스트</h4>
            {question.answers.map((answer) => (
              <QuestionAnswer key={answer}>{answer}</QuestionAnswer>
            ))}
          </QuestionAnswersWrapper>
        </QuestionCard>
      ))}
    </>
  );
}

const QuestionHeading = styled.h3`
  font-size: 20px;
  width: 700px;
`;

const AnswerInfoBox = styled.div`
  margin-bottom: 10px;
`;

const QuestionAnswersWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  width: 700px;
`;

const QuestionAnswer = styled.li`
  list-style: none;
  background-color: ${({ theme }) => theme.brightPrimaryColor};
  padding: 18px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 1.2px 6px -2px rgba(0, 0, 0, 0.6);
  transition: 0.3 all;
  user-select: none;
`;

export default QuestionCards;
