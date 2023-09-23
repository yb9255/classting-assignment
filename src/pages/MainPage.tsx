import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initTimes } from '../redux/questions/reducer';
import StyledLink from '../components/StyledLink';
import { MAIN_PAGE_IMAGE_SRC } from '../constants';

function MainPage() {
  const dispatch = useDispatch();

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
