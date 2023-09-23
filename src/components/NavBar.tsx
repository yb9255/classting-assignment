import { styled } from 'styled-components';
import StyledLink from './StyledLink';

function NavBar() {
  return (
    <NavBarContainer>
      <StyledLink to="/">홈</StyledLink>
      <StyledLink to="/wrong-answered-questions">오답 노트</StyledLink>
    </NavBarContainer>
  );
}

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

export default NavBar;
