import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initTimes } from '../redux/questions/reducer';
import { StyledLink } from '../components';
import { MAIN_PAGE_IMAGE_SRC } from '../constants';
import { styled } from 'styled-components';

function MainPage() {
  const dispatch = useDispatch();

  /** 페이지 진입 시, 이전 문제풀이 때 설정된 시작 시간과 끝 시간을 초기화 */
  useEffect(() => {
    dispatch(initTimes());
  }, [dispatch]);

  return (
    <>
      <h1>영화 퀴즈</h1>
      <img
        width={700}
        height={294}
        src={MAIN_PAGE_IMAGE_SRC}
        alt="quiz icons"
      />
      <LinkWrapper>
        <StyledLink $width={200} to="/questions">
          퀴즈 풀기
        </StyledLink>
        <StyledLink $width={200} to="/wrong-answered-questions">
          오답 노트
        </StyledLink>
      </LinkWrapper>
    </>
  );
}

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default MainPage;
