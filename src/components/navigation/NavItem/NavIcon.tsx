import React from 'react';
import LinkButton from '../../ui/LinkButton';
import * as ROUTES from '../../../constants/routes';
import LinkWrapper from './LinkWrapper';

interface NavIconProps {
  clicked?: () => void;
}

const NavIcon: React.FC<NavIconProps> = ({ clicked }) => {
  return (
    <LinkWrapper>
      <LinkButton title="MyInt" linkTo={ROUTES.LANDING} clicked={clicked} />
    </LinkWrapper>
  );
};
export default NavIcon;
