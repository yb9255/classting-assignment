import { styled } from 'styled-components';

type Props = {
  correctAnswerCount: number;
  wrongAnswerCount: number;
};

function AnswerCount({ correctAnswerCount, wrongAnswerCount }: Props) {
  return (
    <CountWrapper>
      <div>정답 수: {correctAnswerCount} 👍</div>
      <div>오답 수: {wrongAnswerCount} 😂</div>
    </CountWrapper>
  );
}

const CountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

export default AnswerCount;
