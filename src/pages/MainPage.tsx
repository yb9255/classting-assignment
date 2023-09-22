import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initTimes } from '../redux/questions/reducer';

function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initTimes());
  }, [dispatch]);

  return (
    <>
      <h1>영화 퀴즈</h1>
      <Link to="/questions">퀴즈 풀기</Link>
    </>
  );
}

export default MainPage;
