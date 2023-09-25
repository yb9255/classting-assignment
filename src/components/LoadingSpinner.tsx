import styled from 'styled-components';

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 7px solid ${({ theme }) => theme.white};
  border-top: 7px solid ${({ theme }) => theme.primaryColor};
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingSpinner;
