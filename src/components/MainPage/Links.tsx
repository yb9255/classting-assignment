import { styled } from 'styled-components';
import StyledLink from '../StyledLink';

function Links() {
  return (
    <LinkWrapper>
      <StyledLink $width={200} to="/questions">
        퀴즈 풀기
      </StyledLink>
      <StyledLink $width={200} to="/wrong-answered-questions">
        오답 노트
      </StyledLink>
    </LinkWrapper>
  );
}

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default Links;
