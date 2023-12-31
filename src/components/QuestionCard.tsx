import { styled } from 'styled-components';

const QuestionCard = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 760px;
  margin-top: 50px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  padding: 30px 30px;
`;

export default QuestionCard;
