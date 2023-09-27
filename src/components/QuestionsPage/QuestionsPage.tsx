import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getError,
  getIsLoading,
  getQuestions,
} from '../../redux/questions/selectors';
import { v4 as uuid } from 'uuid';
import {
  fetchQuestions,
  increaseCorrectAnsweredQuestions,
  increaseWrongAnsweredQuestions,
  initError,
  setStartTime,
  setEndTime,
} from '../../redux/questions/reducer';
import styled from 'styled-components';

import StyledLink from '../StyledLink';
import Modal from '../Modal';
import LoadingSpinner from '../LoadingSpinner';
import QuestionCard from '../QuestionCard';

import { saveDataToLocalStorageArray } from '../../utils';
import { LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID } from '../../constants';
import QuestionAnswers from './QuestionAnswers';

import type { WrongAnsweredQuestionType } from '../../types';

function QuestionsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMainMessage, setModalMainMessage] = useState('');
  const [modalSubMessage, setModalSubMessage] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const questions = useSelector(getQuestions);

  const targetQuestion = questions[currentQuestionIndex];
  const lastQuestionIndex = questions.length - 1;

  const handleClickAnswer = (answer: string) => {
    setIsModalOpen(true);

    if (targetQuestion.correctAnswer === answer) {
      setModalMainMessage('정답입니다!');
      dispatch(increaseCorrectAnsweredQuestions(targetQuestion));
      return;
    }

    const wrongAnsweredQuestionData: WrongAnsweredQuestionType = {
      id: uuid(),
      question: targetQuestion.question,
      chosenAnswer: answer,
      correctAnswer: targetQuestion.correctAnswer,
      answers: targetQuestion.answers,
    };

    saveDataToLocalStorageArray({
      arrayId: LOCAL_STORAGE_WRONG_ANSWERED_QUESTION_ARRAY_ID,
      data: wrongAnsweredQuestionData,
    });

    setModalMainMessage('틀렸습니다!');
    setModalSubMessage(`정답: ${targetQuestion.correctAnswer}`);
    dispatch(increaseWrongAnsweredQuestions(targetQuestion));
  };

  const handleMoveToNextQuestion = () => {
    setIsModalOpen(false);
    setModalMainMessage('');
    setModalSubMessage(null);

    if (currentQuestionIndex === lastQuestionIndex) {
      dispatch(setEndTime({ endTime: Date.now() }));
      navigate('/questions-result');
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  /** 문제 목록을 서버에 요청하는 액션을 사가에 전송 */
  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  /** 문제 목록을 서버에서 받아왔다면, 시작 시간을 설정 */
  useEffect(() => {
    const hasQuestion = questions.length > 0;

    if (hasQuestion) {
      dispatch(setStartTime({ startTime: Date.now() }));
    }
  }, [questions, dispatch]);

  if (isLoading) {
    return <LoadingSpinner data-testid="loading-spinner" />;
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

  const questionTitleText = `${currentQuestionIndex + 1}: ${
    targetQuestion.question
  }`;

  const progressText = `${currentQuestionIndex + 1} / ${lastQuestionIndex + 1}`;

  return (
    <Container>
      <QuestionCard>
        <QuestionHeading>{questionTitleText}</QuestionHeading>
        <QuestionAnswers
          answers={targetQuestion.answers}
          onClickAnswer={handleClickAnswer}
        />
      </QuestionCard>
      <Progress>{progressText}</Progress>
      {isModalOpen && (
        <Modal
          mainMessage={modalMainMessage}
          subMessage={modalSubMessage}
          onClickButton={handleMoveToNextQuestion}
        />
      )}
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionHeading = styled.h3`
  font-size: 20px;
  width: 700px;
`;

const Progress = styled.div`
  margin-top: 50px;
`;

export default QuestionsPage;
