import { useDispatch, useSelector } from 'react-redux';
import {
  getCorrectAnsweredQuestions,
  getEndTime,
  getStartTime,
  getWrongAnsweredQuestions,
} from '../redux/questions/selectors';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeMillisecondsToMinutesAndSeconds } from '../helpers';
import { BarChart, StyledLink } from '../components';
import { initAnsweredQuestions } from '../redux/questions/reducer';
import { styled } from 'styled-components';

function QuestionsResultPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const startTime = useSelector(getStartTime);
  const endTime = useSelector(getEndTime);
  const correctAnswerCount = useSelector(getCorrectAnsweredQuestions).length;
  const wrongAnswerCount = useSelector(getWrongAnsweredQuestions).length;

  /** 시작 시간과 끝 시간이 같을 시, 퀴즈를 풀지 않았다고 간주하여 메인 페이지로 이동 */
  useEffect(() => {
    if (startTime === endTime) {
      navigate('/');
    }
  }, [startTime, endTime, navigate]);

  const resultData = [
    {
      label: '정답',
      value: correctAnswerCount,
    },
    {
      label: '오답',
      value: wrongAnswerCount,
    },
  ];

  const spentSeconds = changeMillisecondsToMinutesAndSeconds(
    endTime - startTime
  );

  return (
    <Container>
      <h1>문제 결과</h1>
      <h3>소요 시간: {spentSeconds}</h3>
      <CountWrapper>
        <div>정답 수: {correctAnswerCount} 👍</div>
        <div>오답 수: {wrongAnswerCount} 😂</div>
      </CountWrapper>
      {resultData && <BarChart data={resultData} />}
      <StyledLinkBox onClick={() => dispatch(initAnsweredQuestions())}>
        <StyledLink to="/">돌아가기</StyledLink>
      </StyledLinkBox>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const StyledLinkBox = styled.div`
  margin-top: 20px;
`;

export default QuestionsResultPage;
