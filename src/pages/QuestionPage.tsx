import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getError,
  getIsLoading,
  getQuestions,
} from '../redux/questions/selectors';
import { useEffect, useState } from 'react';
import { fetchQuestions } from '../redux/questions/reducer';
import styled from 'styled-components';

function QuestionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { questionId } = useParams<{ questionId?: string }>();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const questions = useSelector(getQuestions);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const targetQuestion =
    questions.find((question) => question.id === Number(questionId)) ??
    questions[0];

  const lastQuestionId = questions[questions.length - 1]?.id;

  function handleClickAnswer(answer: string) {
    setIsModalOpen(true);

    if (targetQuestion.correctAnswer === answer) {
      setModalMessage('정답입니다!');
      return;
    }

    setModalMessage('틀렸습니다!');
  }

  function handleMoveToNextQuestion() {
    setIsModalOpen(false);
    setModalMessage('');

    if (targetQuestion.id !== lastQuestionId) {
      navigate(`/questions/${targetQuestion.id + 1}`);
      return;
    }

    navigate('/questions-result');
  }

  if (isLoading) {
    return <h2>loading...</h2>;
  }

  if (!isLoading && !error && !targetQuestion) {
    return <h2>해당하는 문제가 없습니다.</h2>;
  }

  if (!isLoading && error) {
    return <h2>ERROR!</h2>;
  }

  return (
    <Container>
      <h1>{targetQuestion.question}</h1>
      <ul>
        {targetQuestion.answers.map((answer) => {
          return (
            <li key={answer} onClick={() => handleClickAnswer(answer)}>
              {answer}
            </li>
          );
        })}
      </ul>
      {isModalOpen && (
        <>
          <Backdrop />
          <Modal>
            <div>{modalMessage}</div>
            <button onClick={handleMoveToNextQuestion}>다음</button>
          </Modal>
        </>
      )}
    </Container>
  );
}

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Backdrop = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
  margin: auto;
  border: 1px solid black;
  position: absolute;
  z-index: 3;
`;

export default QuestionPage;
