import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initTimes } from '../../redux/questions/reducer';
import Links from './Links';

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
        src={
          'https://img.paperform.co/fetch/w_1200,f_auto/https://s3.amazonaws.com/pf-form-assets-01/u-59886/assets/2023-03-29/rl13vab/3453%20%5BConverted%5D.jpg'
        }
        alt="quiz icons"
      />
      <Links />
    </>
  );
}

export default MainPage;
