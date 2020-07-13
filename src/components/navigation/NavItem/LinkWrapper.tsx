import React from 'react';
import styled from 'styled-components';

interface LinkWrapperProps {
  children: React.ReactNode;
}

const MainWrapper = styled.div`
  font-size: 2rem;
  margin: 10px;
`;
const LinkWrapper: React.FC<LinkWrapperProps> = ({ children }) => {
  return <MainWrapper>{children}</MainWrapper>;
};
export default LinkWrapper;
