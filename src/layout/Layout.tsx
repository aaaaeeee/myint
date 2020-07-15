import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/navigation/NavBar';
import SideBar from '../components/navigation/SideBar';

interface LayoutProps {
  children: React.ReactNode;
}

const MainWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 6rem);
  margin-top: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <SideBar />
      <MainWrapper>{children}</MainWrapper>
    </>
  );
};
export default Layout;
