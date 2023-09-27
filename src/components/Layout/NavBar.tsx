import { styled } from 'styled-components';
import StyledLink from '../StyledLink';
import { useDispatch } from 'react-redux';
import { initAnsweredQuestions } from '../../redux/questions/reducer';

function NavBar() {
  const dispatch = useDispatch();

  return (
    <NavBarContainer>
      <div onClick={() => dispatch(initAnsweredQuestions())}>
        <StyledLink to="/">홈</StyledLink>
      </div>
      <div onClick={() => dispatch(initAnsweredQuestions())}>
        <StyledLink to="/wrong-answered-questions">오답 노트</StyledLink>
      </div>
    </NavBarContainer>
  );
}

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

export default NavBar;
