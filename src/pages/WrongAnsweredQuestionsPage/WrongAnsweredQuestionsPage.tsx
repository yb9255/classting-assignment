import { styled } from 'styled-components';
import { QuestionCard, PageNavigation } from '../../components';
import { LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID } from '../../constants';
import usePagination from '../../hooks/usePagination';

export type WrongAnsweredQuestionType = {
  id: string;
  question: string;
  chosenAnswer: string;
  correctAnswer: string;
  answers: string[];
};

const WRONG_ANSWERED_QUESTIONS_COUNT_PER_PAGE = 5;

function WrongAnsweredQuestionsPage() {
  const wrongAnsweredQuestionData = localStorage.getItem(
    LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID
  );

  const wrongAnsweredQuestionHistory: WrongAnsweredQuestionType[] =
    wrongAnsweredQuestionData ? JSON.parse(wrongAnsweredQuestionData) : [];

  const {
    currentPageIndex,
    setCurrentPageIndex,
    currentPageData: currentPageQuestions,
    totalPageCount,
  } = usePagination<WrongAnsweredQuestionType>({
    dataArray: wrongAnsweredQuestionHistory,
    pageLimit: WRONG_ANSWERED_QUESTIONS_COUNT_PER_PAGE,
  });

  const handleClickPrevButton = () => {
    if (currentPageIndex === 0) return;
    window.scrollTo({ top: 0 });

    setCurrentPageIndex(currentPageIndex - 1);
  };

  const handleClickNextButton = () => {
    if (currentPageIndex + 1 === totalPageCount) return;
    window.scrollTo({ top: 0 });

    setCurrentPageIndex(currentPageIndex + 1);
  };

  if (wrongAnsweredQuestionHistory.length <= 0) {
    return (
      <Container>
        <WrongAnsweredQuestionsPageHeading>
          오답 노트
        </WrongAnsweredQuestionsPageHeading>
        <h3>오답 기록이 없습니다.</h3>
      </Container>
    );
  }

  return (
    <Container>
      <WrongAnsweredQuestionsPageHeading>
        오답 노트
      </WrongAnsweredQuestionsPageHeading>
      {currentPageQuestions.map((question) => {
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
      <Spacing />
      <PageNavigation
        currentPage={currentPageIndex + 1}
        totalPageCount={totalPageCount}
        onPrev={handleClickPrevButton}
        onNext={handleClickNextButton}
      />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const WrongAnsweredQuestionsPageHeading = styled.h1`
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
  background-color: ${({ theme }) => theme.brightPrimaryColor};
  padding: 18px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 1.2px 6px -2px rgba(0, 0, 0, 0.6);
  transition: 0.3 all;
  user-select: none;
`;

const Spacing = styled.div`
  height: 30px;
`;

export default WrongAnsweredQuestionsPage;
