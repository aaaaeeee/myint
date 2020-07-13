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

const MainWrapper = styled.div``;
const LinkWrapper = styled(NavLink)`
  color: white;
  &:hover {
    font-weight: bold;
  }
`;
const LinkButton: React.FC<LinkButtonProps> = ({ title, linkTo, clicked }) => {
  return (
    <MainWrapper>
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
    </MainWrapper>
  );
};
export default LinkButton;
