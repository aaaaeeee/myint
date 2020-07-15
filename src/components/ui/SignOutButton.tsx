import React from 'react';
import styled from 'styled-components';
import { useFirebase } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import LinkWrapper from '../navigation/NavItem/LinkWrapper';

interface SignOutButtonProps {}

const StyledButton = styled.button`
  border: none;
  color: white;
  font-size: 2rem;
  background: transparent;
  padding: 10px;
  &:hover {
    font-weight: bold;
  }
`;

const SignOutButton: React.FC<SignOutButtonProps> = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push('/');
      });
  };
  return (
    <LinkWrapper>
      <StyledButton onClick={() => handleSignOut()}>Sign Out</StyledButton>
    </LinkWrapper>
  );
};
export default SignOutButton;
