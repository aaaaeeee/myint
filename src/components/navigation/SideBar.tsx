import React from 'react';
import styled from 'styled-components';
import NavIcon from './NavItem/NavIcon';
import Hamburger from './Hamburger/Hamburger';
import NavItems from './NavItems';

interface SideBarProps {}
interface StyleProps {
  opened: boolean;
}
const FixedWrapper = styled.header`
  position: fixed;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.main};
  padding: 0rem 2rem;
  top: 0;
  left: 0;
  height: 6rem;
  display: none;
  @media ${({ theme }) => theme.mediaQueries.small} {
    display: flex;
  }
`;
const MainWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Menu = styled.div<StyleProps>`
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  align-items: center;
  justify-content: center;
  margin-top: 6rem;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.main};
  visibility: ${(props) => (props.opened ? 'visibile' : 'hidden')};
  transform: translateY(${(props) => (props.opened ? '0%' : '-100%')});
  transition: all 0.1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  display: none;

  @media ${(props) => props.theme.mediaQueries.small} {
    display: flex;
  }
`;

const SideBar: React.FC<SideBarProps> = () => {
  const [isOpened, setIsOpened] = React.useState(false);
  return (
    <>
      <FixedWrapper>
        <MainWrapper>
          <NavIcon clicked={() => setIsOpened(false)} />
          <Hamburger opened={isOpened} clicked={() => setIsOpened(!isOpened)} />
        </MainWrapper>
      </FixedWrapper>
      {isOpened && (
        <Menu opened={isOpened}>
          <NavItems mobile clicked={() => setIsOpened(false)} />
        </Menu>
      )}
    </>
  );
};
export default SideBar;
