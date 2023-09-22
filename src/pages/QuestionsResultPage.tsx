import { useSelector } from 'react-redux';
import {
  getCorrectAnsweredQuestions,
  getEndTime,
  getStartTime,
  getWrongAnsweredQuestions,
} from '../redux/questions/selectors';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeMillisecondsToMinutesAndSeconds } from '../helpers';

function QuestionsResultPage() {
  const navigate = useNavigate();
  const startTime = useSelector(getStartTime);
  const endTime = useSelector(getEndTime);
  const correctAnswerCount = useSelector(getCorrectAnsweredQuestions).length;
  const wrongAnswerCount = useSelector(getWrongAnsweredQuestions).length;

  const spentSeconds = changeMillisecondsToMinutesAndSeconds(
    endTime - startTime
  );

  useEffect(() => {
    if (startTime === endTime) {
      navigate('/');
    }
  }, [startTime, endTime, navigate]);

  return (
    <>
      <h1>문제 결과</h1>
      <h3>소요 시간: {spentSeconds}</h3>
      <div>정답 수: {correctAnswerCount}</div>
      <div>오답 수: {wrongAnswerCount}</div>
    </>
  );
}

export default QuestionsResultPage;
