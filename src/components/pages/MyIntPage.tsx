import React from 'react';
import styled from 'styled-components';
import Interests from '../interests/Interests';

interface MyIntPageProps {}

const MainWrapper = styled.div`
  width: 100%;
`;
const MyIntPage: React.FC<MyIntPageProps> = () => {
  return (
    <MainWrapper>
      <Interests />
    </MainWrapper>
  );
};
export default MyIntPage;
