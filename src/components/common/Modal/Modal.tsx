import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Backdrop from './Backdrop/Backdrop';

interface ModalProps {
  opened: boolean;
  close?: () => void;
  children?: React.ReactNode;
}
const WrappedModal = styled.div<ModalProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: ${({ opened }) => (opened ? 'translate(-50%, -50%)' : 'translate(-50%, -150%)')};
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 150;
  justify-content: center;
  opacity: ${({ opened }) => (opened ? '1' : '0')};
  visibility: ${({ opened }) => (opened ? 'visible' : 'hidden')};
  width: 100%;
  max-width: 50rem;
  box-shadow: 0 0.5rem 3.5em ${({ theme }) => theme.colors.shadow};
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.whiteColor};
  transition: all 0.1s;
`;

const InsideWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 4rem 3rem;
`;

const Modal: React.FC<ModalProps> = React.memo(
  ({ opened, close, children }) => {
    const content = (
      <>
        <Backdrop close={close} opened={opened} />
        <WrappedModal opened={opened}>
          <InsideWrapper>{children}</InsideWrapper>
        </WrappedModal>
      </>
    );
    return ReactDOM.createPortal(content, document.body);
  },
  (prevProps, nextProps) => {
    return prevProps.opened === nextProps.opened;
  }
);

export default Modal;
