import { styled } from 'styled-components';
import { WrongAnsweredQuestionType } from '../../types';

type Props = {
  question: WrongAnsweredQuestionType;
};

function QuestionAnswers({ question }: Props) {
  return (
    <QuestionAnswersWrapper>
      <h4>답지 리스트</h4>
      {question.answers.map((answer) => (
        <QuestionAnswer key={answer}>{answer}</QuestionAnswer>
      ))}
    </QuestionAnswersWrapper>
  );
}

const QuestionAnswersWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  width: 100%;
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
  word-wrap: break-word;
`;

export default QuestionAnswers;
