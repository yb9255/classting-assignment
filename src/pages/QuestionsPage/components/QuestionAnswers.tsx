import { styled } from 'styled-components';

type Props = {
  answers: string[];
  onClickAnswer: (answer: string) => void;
};

function QuestionAnswers({ answers, onClickAnswer }: Props) {
  return (
    <QuestionAnswersWrapper>
      {answers.map((answer) => {
        return (
          <QuestionAnswer key={answer} onClick={() => onClickAnswer(answer)}>
            {answer}
          </QuestionAnswer>
        );
      })}
    </QuestionAnswersWrapper>
  );
}

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
  cursor: pointer;
  transition: 0.3 all;
  user-select: none;

  &:hover {
    box-shadow: 0 2px 6px -2px rgba(0, 0, 0, 0.5);
  }
`;

export default QuestionAnswers;
