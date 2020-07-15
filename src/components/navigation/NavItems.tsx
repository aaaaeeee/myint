import React from 'react';
import styled from 'styled-components';
import LinkButton from '../ui/LinkButton';
import * as ROUTES from '../../constants/routes';

import SignOutButton from '../ui/SignOutButton';

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

const LinkWrapper = styled.div`
  font-size: 2rem;
  margin: 10px;
`;
const NavItems: React.FC<NavItemsProps> = ({ mobile, clicked }) => {
  return (
    <Nav>
      <Ul mobile={mobile}>
        <LinkWrapper>
          <LinkButton title="Home" linkTo={ROUTES.LANDING} clicked={clicked} />
        </LinkWrapper>
        <LinkWrapper>
          <LinkButton
            title="Sign In"
            linkTo={ROUTES.SIGN_IN}
            clicked={clicked}
          />
        </LinkWrapper>
        <LinkWrapper>
          <LinkButton
            title="Sign Up"
            linkTo={ROUTES.SIGN_UP}
            clicked={clicked}
          />
        </LinkWrapper>
        <SignOutButton />
      </Ul>
    </Nav>
  );
};
export default NavItems;
