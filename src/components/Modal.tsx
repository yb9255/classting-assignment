import { styled } from 'styled-components';
import { createPortal } from 'react-dom';
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
            <ModalButton onClick={onClickButton}>다음</ModalButton>
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

const ModalButton = styled.button`
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
  transition: 0.3s all;
  border: none;
  cursor: pointer;

  &:active {
    box-shadow: none;
    transform: translate(3px, 3px);
  }
`;

export default Modal;
