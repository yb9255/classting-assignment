import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getError,
  getIsLoading,
  getQuestions,
} from '../redux/questions/selectors';
import { useEffect, useState } from 'react';
import {
  fetchQuestions,
  increaseCorrectAnsweredQuestions,
  increaseWrongAnsweredQuestions,
  initError,
  setStartTime,
  setEndTime,
} from '../redux/questions/reducer';
import styled from 'styled-components';
import { WrongAnsweredQuestionType } from './WrongAnsweredQuestionsPage';
import StyledLink from '../components/StyledLink';
import Modal from '../components/Modal';

function QuestionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const questions = useSelector(getQuestions);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    const hasQuestion = questions.length > 0;

    if (hasQuestion) {
      dispatch(setStartTime({ startTime: Date.now() }));
    }
  }, [questions, dispatch]);

  const targetQuestion = questions[currentQuestionIndex];

  const lastQuestionIndex = questions.length - 1;

  function handleClickAnswer(answer: string) {
    setIsModalOpen(true);

    if (targetQuestion.correctAnswer === answer) {
      setModalMessage('정답입니다!');
      dispatch(increaseCorrectAnsweredQuestions(targetQuestion));
      return;
    }

    const wrongAnsweredQuestionData = localStorage.getItem(
      'wrong-answered-questions'
    );

    const wrongAnsweredQuestionsHistory: WrongAnsweredQuestionType[] =
      wrongAnsweredQuestionData ? JSON.parse(wrongAnsweredQuestionData) : [];

    wrongAnsweredQuestionsHistory.push({
      question: targetQuestion.question,
      chosenAnswer: answer,
      correctAnswer: targetQuestion.correctAnswer,
      answers: targetQuestion.answers,
    });

    localStorage.setItem(
      'wrong-answered-questions',
      JSON.stringify(wrongAnsweredQuestionsHistory)
    );

    setModalMessage('틀렸습니다!');

    dispatch(increaseWrongAnsweredQuestions(targetQuestion));
  }

  function handleMoveToNextQuestion() {
    setIsModalOpen(false);
    setModalMessage('');

    if (currentQuestionIndex === lastQuestionIndex) {
      dispatch(setEndTime({ endTime: Date.now() }));
      navigate('/questions-result');
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  if (isLoading) {
    return <h2>loading...</h2>;
  }

  if (!isLoading && !error && !targetQuestion) {
    return (
      <>
        <h2>해당하는 문제가 없습니다.</h2>
        <StyledLink to="/" onClick={() => dispatch(initError())}>
          돌아가기
        </StyledLink>
      </>
    );
  }

  if (!isLoading && error) {
    return (
      <>
        <h2>ERROR!</h2>
        <StyledLink to="/" onClick={() => dispatch(initError())}>
          돌아가기
        </StyledLink>
      </>
    );
  }

  return (
    <QuestionContainer>
      <QuestionHeading>{`${currentQuestionIndex + 1}: ${
        targetQuestion.question
      }`}</QuestionHeading>
      <QuestionAnswersWrapper>
        {targetQuestion.answers.map((answer) => {
          return (
            <QuestionAnswer
              key={answer}
              onClick={() => handleClickAnswer(answer)}
            >
              {answer}
            </QuestionAnswer>
          );
        })}
      </QuestionAnswersWrapper>
      {isModalOpen && (
        <Modal
          modalMessage={modalMessage}
          onClickButton={handleMoveToNextQuestion}
        />
      )}
    </QuestionContainer>
  );
}

const QuestionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-top: 50px;
`;
const QuestionHeading = styled.h3`
  font-size: 20px;
  width: 700px;
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
  background-color: #fff;
  padding: 18px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 1.2px 6px -2px rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: 0.3 all;

  &:hover {
    box-shadow: 0 2px 6px -2px rgba(0, 0, 0, 0.5);
  }
`;

export default QuestionPage;
