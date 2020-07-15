import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { RootState } from '../../store/rootReducer';
import Spinner from '../ui/Spinner';

interface AuthIsLoadedProps {
  children: React.ReactNode;
}

const FixedWrapper = styled.header`
  position: fixed;
  background-color: ${({ theme }) => theme.colors.main};
  padding: 0rem 2rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
`;
const MainWrapper = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
const AuthIsLoaded: React.FC<AuthIsLoadedProps> = ({ children }) => {
  const auth = useSelector((state: RootState) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <FixedWrapper>
        <MainWrapper>
          <Spinner />
        </MainWrapper>
      </FixedWrapper>
    );
  return <>{children}</>;
};
export default AuthIsLoaded;
