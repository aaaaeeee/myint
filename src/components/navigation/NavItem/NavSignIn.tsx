import React from 'react';
import LinkButton from '../../ui/LinkButton';
import * as ROUTES from '../../../constants/routes';
import LinkWrapper from './LinkWrapper';

interface NavSignInProps {}

const NavSignIn: React.FC<NavSignInProps> = () => {
  return (
    <LinkWrapper>
      <LinkButton title="Sign In" linkTo={ROUTES.SIGN_IN} />
    </LinkWrapper>
  );
};
export default NavSignIn;
