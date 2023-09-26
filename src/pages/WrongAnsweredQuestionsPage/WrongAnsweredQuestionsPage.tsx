import { styled } from 'styled-components';
import { PageNavigation } from '../../components';
import { LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID } from '../../constants';
import usePagination from '../../hooks/usePagination';
import { QuestionCards } from './components';

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
      <QuestionCards questions={currentPageQuestions} />
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

const Spacing = styled.div`
  height: 30px;
`;

export default WrongAnsweredQuestionsPage;
