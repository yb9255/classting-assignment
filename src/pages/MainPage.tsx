import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initTimes } from '../redux/questions/reducer';
import styled from 'styled-components';
import StyledLink from '../components/StyledLink';

function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initTimes());
  }, [dispatch]);

  return (
    <>
      <MainPageHeader>영화 퀴즈</MainPageHeader>
      <MainPageImage
        width={700}
        height={294}
        src="https://img.paperform.co/fetch/w_1200,f_auto/https://s3.amazonaws.com/pf-form-assets-01/u-59886/assets/2023-03-29/rl13vab/3453%20%5BConverted%5D.jpg"
      />
      <StyledLink $width={200} to="/questions">
        시작하기
      </StyledLink>
    </>
  );
}

const MainPageHeader = styled.h1`
  margin: 0;
  margin-bottom: 20px;
`;

const MainPageImage = styled.img`
  margin-bottom: 50px;
`;

export default MainPage;
