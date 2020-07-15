import React from 'react';
import styled from 'styled-components';
import { isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

import LinkButton from '../ui/LinkButton';
import * as ROUTES from '../../constants/routes';

import SignOutButton from '../ui/SignOutButton';
import { RootState } from '../../store/rootReducer';

interface NavItemsProps {
  mobile?: boolean;
  clicked?: () => void;
}
const Nav = styled.nav<NavItemsProps>`
  display: flex;
  margin-top: ${(props) => (props.mobile ? '-6rem' : null)};
`;
const Ul = styled.ul<NavItemsProps>`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.mobile ? 'column' : 'row')};
  height: 100%;
`;

const LinkWrapper = styled.div<NavItemsProps>`
  font-size: 2rem;
  margin: ${(props) => (props.mobile ? '1.5rem 0rem 1rem 0rem' : '0rem 1rem 0rem 0rem')};
`;
const NavItems: React.FC<NavItemsProps> = ({ mobile, clicked }) => {
  const auth = useSelector((state: RootState) => state.firebase.auth);
  return (
    <Nav>
      <Ul mobile={mobile}>
        <LinkWrapper mobile={mobile}>
          <LinkButton title="Home" linkTo={ROUTES.HOME} clicked={clicked} />
        </LinkWrapper>
        {isEmpty(auth) ? (
          <>
            <LinkWrapper mobile={mobile}>
              <LinkButton title="Sign In" linkTo={ROUTES.SIGN_IN} clicked={clicked} />
            </LinkWrapper>
            <LinkWrapper mobile={mobile}>
              <LinkButton title="Sign Up" linkTo={ROUTES.SIGN_UP} clicked={clicked} />
            </LinkWrapper>
          </>
        ) : (
          <>
            <LinkWrapper mobile={mobile}>
              <LinkButton title="MyInt" linkTo={ROUTES.LANDING} clicked={clicked} />
            </LinkWrapper>
            <LinkWrapper mobile={mobile}>
              <SignOutButton />
            </LinkWrapper>
          </>
        )}
      </Ul>
    </Nav>
  );
};
export default NavItems;
