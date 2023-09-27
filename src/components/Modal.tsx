import { styled } from 'styled-components';
import { createPortal } from 'react-dom';
import StyledButton from './StyledButton';
type Props = {
  mainMessage: string;
  subMessage?: string | null;
  onClickButton: () => void;
};

function Modal({ mainMessage, subMessage, onClickButton }: Props) {
  const overlayRoot = document.getElementById('overlay-root') as HTMLDivElement;

  return createPortal(
    <>
      <Backdrop />
      <ModalBody>
        <MessageBox>{mainMessage}</MessageBox>
        {subMessage && <MessageBox>{subMessage}</MessageBox>}
        <StyledButton onClick={onClickButton}>다음</StyledButton>
      </ModalBody>
    </>,
    overlayRoot
  );
}

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 3;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 400px;
  height: 300px;
  border-radius: 10px;
  position: fixed;
  z-index: 4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.white};
`;

const MessageBox = styled.div`
  font-size: 20px;
  width: 100%;
  text-align: center;
  word-break: break-word;
  padding: 0 10px;
  box-sizing: border-box;
`;

export default Modal;
