import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)<{ $width?: number }>`
  width: ${({ $width }) => $width && `${$width}px;`};
  background-color: #fdbb11;
  color: white;
  padding: 15px 32px;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 15px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
`;

export default StyledLink;
