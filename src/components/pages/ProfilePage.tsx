import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';

interface ProfilePageProps {}

const MainWrapper = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
`;

const ProfileWrapper = styled.div`
  font-size: 2rem;
`;
const ProfilePage: React.FC<ProfilePageProps> = () => {
  const profile = useSelector((state: RootState) => state.firebase.profile?.email);
  return (
    <MainWrapper>
      <ProfileWrapper>Hello {profile}</ProfileWrapper>
    </MainWrapper>
  );
};
export default ProfilePage;
