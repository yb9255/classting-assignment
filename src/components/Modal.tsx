import { styled } from 'styled-components';
import { createPortal } from 'react-dom';
import StyledButton from './StyledButton';
type Props = {
  modalMessage: string;
  onClickButton: () => void;
};

function Modal({ modalMessage, onClickButton }: Props) {
  const overlayRoot = document.getElementById('overlay-root');

  return overlayRoot
    ? createPortal(
        <>
          <Backdrop />
          <ModalBody>
            <ModalMessageBox>{modalMessage}</ModalMessageBox>
            <StyledButton onClick={onClickButton}>다음</StyledButton>
          </ModalBody>
        </>,
        overlayRoot
      )
    : null;
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
  background-color: #fff;
`;

const ModalMessageBox = styled.div`
  font-size: 20px;
`;

export default Modal;
