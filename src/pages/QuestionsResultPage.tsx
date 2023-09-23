import { useDispatch, useSelector } from 'react-redux';
import {
  getCorrectAnsweredQuestions,
  getEndTime,
  getStartTime,
  getWrongAnsweredQuestions,
} from '../redux/questions/selectors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeMillisecondsToMinutesAndSeconds } from '../helpers';
import { BarChart } from '../components/BarChart';
import StyledLink from '../components/StyledLink';
import { initAnsweredQuestions } from '../redux/questions/reducer';

function QuestionsResultPage() {
  const dispatch = useDispatch();
  const [resultData, setResultData] = useState<
    { label: '정답' | '오답'; value: number }[] | null
  >(null);
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

  useEffect(() => {
    setResultData([
      {
        label: '정답',
        value: correctAnswerCount,
      },
      {
        label: '오답',
        value: wrongAnswerCount,
      },
    ]);
  }, [correctAnswerCount, wrongAnswerCount]);

  useEffect(() => {
    return () => {
      dispatch(initAnsweredQuestions());
    };
  }, [dispatch]);

  return (
    <>
      <h1>문제 결과</h1>
      <h3>소요 시간: {spentSeconds}</h3>
      <div>정답 수: {correctAnswerCount}</div>
      <div>오답 수: {wrongAnswerCount}</div>
      <StyledLink to="/">돌아가기</StyledLink>
      {resultData && <BarChart data={resultData} />}
    </>
  );
}

export default QuestionsResultPage;
