export type WrongAnsweredQuestionType = {
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
      <>
        <h1>오답 노트</h1>
        <h3>오답 기록이 없습니다.</h3>
      </>
    );
  }

  return (
    <>
      <h1>오답 노트</h1>
      {wrongAnsweredQuestionHistory.map((history) => {
        return (
          <div key={history.question}>
            <h3>문제: {history.question}</h3>
            <div>선택한 오답: {history.chosenAnswer}</div>
            <div>정답: {history.correctAnswer}</div>
            <ul>
              {history.answers.map((answer) => (
                <li key={answer}>{answer}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
}

export default WrongAnsweredQuestionsPage;
