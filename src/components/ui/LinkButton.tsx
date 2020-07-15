import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface LinkButtonProps {
  width?: string;
  height?: string;
  textColor?: string;
  title: string;
  linkTo: string;
  clicked?: () => void;
}

const LinkWrapper = styled(NavLink)`
  color: white;
  padding: 1rem;
  &:hover {
    color: lightgrey;
  }
`;
const LinkButton: React.FC<LinkButtonProps> = ({ title, linkTo, clicked }) => {
  return (
    <LinkWrapper
      exact
      to={linkTo}
      activeStyle={{
        borderBottomWidth: 3,
        borderBottomColor: 'whitesmoke',
        borderBottomStyle: 'solid',
      }}
      onClick={clicked}
    >
      {title}
    </LinkWrapper>
  );
};
export default LinkButton;
