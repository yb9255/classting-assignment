import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initTimes } from '../redux/questions/reducer';
import { StyledLink } from '../components';
import { MAIN_PAGE_IMAGE_SRC } from '../constants';

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
      <StyledLink $width={200} to="/questions">
        시작하기
      </StyledLink>
    </>
  );
}

export default MainPage;
