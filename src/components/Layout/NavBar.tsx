import { styled } from 'styled-components';
import StyledLink from '../StyledLink';
import { useDispatch } from 'react-redux';
import { initAnsweredQuestions } from '../../redux/questions/reducer';

function NavBar() {
  const dispatch = useDispatch();

  return (
    <NavBarContainer>
      <StyledLink to="/" onClick={() => dispatch(initAnsweredQuestions())}>
        홈
      </StyledLink>
      <StyledLink
        to="/wrong-answered-questions"
        onClick={() => dispatch(initAnsweredQuestions())}
      >
        오답 노트
      </StyledLink>
    </NavBarContainer>
  );
}

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

export default NavBar;
