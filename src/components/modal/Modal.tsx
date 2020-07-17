import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

interface ModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activator: (setShow: any) => void;
  children: React.ReactNode;
}

const MainWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 98;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
const ModalWrapper = styled.div`
  position: relative;
  z-index: 99;
  width: 100%;
  max-width: 70rem;
  max-height: 100%;
  margin: 2rem;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-radius: 4px;
  background-color: white;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0rem;
  right: 0;
  padding: 5px;
  border: 0;
  -webkit-appearance: none;
  background: none;
  color: ${({ theme }) => theme.colors.main};
  cursor: pointer;
`;

const CancelButton = styled.button`
  width: 100%;
  max-width: 35rem;
  padding: 1rem 2rem;
  height: 5rem;
  border: none;
  font-size: 1.3rem;
  border-radius: 2rem;
  color: white;
  background-color: ${({ theme }) => theme.colors.main};
  margin-bottom: 3rem;
  &:hover {
    font-weight: bold;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const Modal: React.FC<ModalProps> = ({ children, activator }) => {
  const [show, setShow] = React.useState(false);
  const content = show && (
    <MainWrapper>
      <ModalWrapper>
        <CloseButton className="modal-close" type="button" onClick={() => setShow(false)}>
          X
        </CloseButton>
        <ModalBody>
          {children}
          <CancelButton onClick={() => setShow(false)}>Cancel</CancelButton>
        </ModalBody>
      </ModalWrapper>
    </MainWrapper>
  );
  return (
    <>
      {activator({ setShow })}
      {createPortal(content, document.body)}
    </>
  );
};
export default Modal;
