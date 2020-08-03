import React from 'react';
import styled from 'styled-components';
import Heading from '../ui/Heading';
import { Container } from '../../layout/Container';
import AddInterest from './AddInterest';

interface InterestsProps {}

const MainWrapper = styled.div`
  width: 100%;
  align-self: flex-start;
  height: 100%;
  min-height: calc(100vh - 6rem);
  background-color: ${({ theme }) => theme.colors.whiteColor};
`;

const InterestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 4rem;
`;
const Interests: React.FC<InterestsProps> = () => {
  return (
    <MainWrapper>
      <Container>
        <InterestWrapper>
          <Heading size="h3">MyInterests</Heading>
          <AddInterest />
        </InterestWrapper>
      </Container>
    </MainWrapper>
  );
};
export default Interests;
