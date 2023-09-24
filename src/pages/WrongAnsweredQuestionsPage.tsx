import { styled } from 'styled-components';
import QuestionCard from '../components/QuestionCard';

export type WrongAnsweredQuestionType = {
  id: string;
  question: string;
  chosenAnswer: string;
  correctAnswer: string;
  answers: string[];
};

function WrongAnsweredQuestionsPage() {
  const wrongAnsweredQuestionData = localStorage.getItem(
    'wrong-answered-questions'
  );

  const wrongAnsweredQuestionHistory: WrongAnsweredQuestionType[] =
    wrongAnsweredQuestionData ? JSON.parse(wrongAnsweredQuestionData) : [];

  if (wrongAnsweredQuestionHistory.length <= 0) {
    return (
      <Container>
        <WrongAnsweredQuestionPageHeading>
          오답 노트
        </WrongAnsweredQuestionPageHeading>
        <h3>오답 기록이 없습니다.</h3>
      </Container>
    );
  }

  return (
    <Container>
      <WrongAnsweredQuestionPageHeading>
        오답 노트
      </WrongAnsweredQuestionPageHeading>
      {wrongAnsweredQuestionHistory.map((question) => {
        return (
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
        );
      })}
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const WrongAnsweredQuestionPageHeading = styled.h1`
  margin-top: 50px;
`;

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
  background-color: #fbebe4;
  padding: 18px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 1.2px 6px -2px rgba(0, 0, 0, 0.6);
  transition: 0.3 all;
  user-select: none;
`;

export default WrongAnsweredQuestionsPage;
