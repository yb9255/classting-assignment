import { useDispatch, useSelector } from 'react-redux';
import {
  getCorrectAnsweredQuestions,
  getEndTime,
  getStartTime,
  getWrongAnsweredQuestions,
} from '../../redux/questions/selectors';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeMillisecondsToMinutesAndSeconds } from '../../utils';
import { BarChart } from '../BarChart';
import StyledLink from '../StyledLink';
import { initAnsweredQuestions } from '../../redux/questions/reducer';
import { styled } from 'styled-components';
import AnswerCount from './AnswerCount';

function QuestionsResultPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const startTime = useSelector(getStartTime);
  const endTime = useSelector(getEndTime);
  const correctAnswerCount = useSelector(getCorrectAnsweredQuestions).length;
  const wrongAnswerCount = useSelector(getWrongAnsweredQuestions).length;

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

  /** 시작 시간과 끝 시간이 같을 시, 퀴즈를 풀지 않았다고 간주하여 메인 페이지로 이동 */
  useEffect(() => {
    if (startTime === endTime) {
      navigate('/');
    }
  }, [startTime, endTime, navigate]);

  /** 정답 리스트와 오답 리스트 모두 빈 배열이면, 퀴즈를 풀지 않았다고 간주하여 메인 페이지로 이동 */
  useEffect(() => {
    if (correctAnswerCount === 0 && wrongAnswerCount === 0) {
      navigate('/');
    }
  }, [correctAnswerCount, wrongAnswerCount, navigate]);

  return (
    <Container>
      <h1>문제 결과</h1>
      <h3>소요 시간: {spentSeconds}</h3>
      <AnswerCount
        correctAnswerCount={correctAnswerCount}
        wrongAnswerCount={wrongAnswerCount}
      />
      {resultData && <BarChart data={resultData} />}
      <StyledLinkBox>
        <StyledLink to="/" onClick={() => dispatch(initAnsweredQuestions())}>
          돌아가기
        </StyledLink>
      </StyledLinkBox>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLinkBox = styled.div`
  margin-top: 20px;
`;

export default QuestionsResultPage;
