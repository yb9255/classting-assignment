import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <>
      <h1>영화 퀴즈</h1>
      <Link to="/questions">퀴즈 풀기</Link>
    </>
  );
}

export default MainPage;
