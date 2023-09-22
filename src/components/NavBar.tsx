import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

function NavBar() {
  return (
    <NavBarContainer>
      <Link to="/">홈</Link>
      <Link to="/wrong-answered-questions">오답 노트</Link>
    </NavBarContainer>
  );
}

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

export default NavBar;
