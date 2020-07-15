import React from 'react';
import styled from 'styled-components';
import { useFirebase } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';

interface SignOutButtonProps {}

const StyledButton = styled.button`
  border: none;
  color: white;
  font-size: 2rem;
  background: transparent;
  padding: 1rem;
  &:hover {
    color: lightgrey;
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
  return <StyledButton onClick={() => handleSignOut()}>Sign Out</StyledButton>;
};
export default SignOutButton;
