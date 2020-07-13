import React from 'react';
import styled from 'styled-components';

import Container from '../../layout/Container';
import NavItems from './NavItems';
import NavIcon from './NavItem/NavIcon';

interface NavigationBarProps {}
const FixedWrapper = styled.header`
  position: fixed;
  background-color: ${({ theme }) => theme.colors.main};
  padding: 0rem 2rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;

  @media ${({ theme }) => theme.mediaQueries.small} {
    display: none;
  }
`;
const MainWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

const NavigationBar: React.FC<NavigationBarProps> = () => {
  return (
    <FixedWrapper>
      <Container>
        <MainWrapper>
          <NavIcon />
          <NavItems />
        </MainWrapper>
      </Container>
    </FixedWrapper>
  );
};
export default NavigationBar;
