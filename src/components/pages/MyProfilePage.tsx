import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useSelector } from 'react-redux';
import { useForm, FieldError } from 'react-hook-form';
import { DeepMap } from 'react-hook-form/dist/types/utils';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { RootState } from '../../store/rootReducer';
import { FormWrapper, StyledForm } from '../../layout/Container';
import Spinner from '../ui/Spinner';
import Modal from '../common/Modal/Modal';
import Button from '../ui/Button';
import Heading from '../ui/Heading';

interface ProfilePageProps {}
type FormData = {
  email: string;
  password: string;
};

type StyleProps = {
  show?: DeepMap<FormData, FieldError>;
};

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  &:not(:last-child) {
    margin-bottom: 2.5rem;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1rem 2rem;
  border: none;
  font-size: 1.3rem;
  border-radius: 2rem;
  color: ${({ theme }) => theme.colors.main};
  height: 4rem;
`;

const Error = styled.div<StyleProps>`
  color: ${({ theme }) => theme.colors.errorRed};
  font-size: 1.3rem;
  font-weight: bold;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  height: 5rem;
  border: none;
  font-size: 1.3rem;
  border-radius: 2rem;
  color: ${({ theme }) => theme.colors.main};
  background-color: white;
  margin: 3rem 0rem;
  &:hover {
    font-weight: bold;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const SubmitWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const theme = useTheme();

  const [modalOpened, setModalOpened] = React.useState(false);
  const profile = useSelector((state: RootState) => state.firebase.profile);
  const uid = useSelector((state: RootState) => state.firebase.auth.uid);
  const [isLoading, setIsLoading] = React.useState(false);
  const [firebaseErrors, setFirebaseErrors] = React.useState('');
  const { register, handleSubmit, errors, setValue } = useForm<FormData>();
  const firebase = useFirebase();
  const firestore = useFirestore();

  React.useEffect(() => {
    setValue('email', profile.email);
  });
  const onSubmit = handleSubmit(async ({ email, password }) => {
    setIsLoading(true);

    try {
      if (email !== profile.email) {
        await firebase.updateEmail(email);
      }
      await firestore.collection('users').doc(uid).set({
        email,
        username: email,
      });
      setIsLoading(false);
    } catch ({ code }) {
      setFirebaseErrors(code);
      setIsLoading(false);
    }
  });

  const handleRemove = async () => {
    setIsLoading(true);
    setModalOpened(false);
    const user = firebase.auth().currentUser;
    try {
      await firestore.collection('users').doc(uid).delete();
      await user?.delete();
      setIsLoading(false);
    } catch ({ code }) {
      setFirebaseErrors(code);
      setIsLoading(false);
    }
  };
  return (
    <FormWrapper>
      <Heading size="h3" bold color={theme.colors.whiteColor}>
        Hello {profile.email} update you profile
      </Heading>
      <StyledForm onSubmit={onSubmit}>
        {firebaseErrors && <Error>{firebaseErrors}</Error>}
        <InputWrapper>
          <FormInput name="email" placeholder="username" ref={register({ required: true })} />
          {errors.email && <Error show={errors}>This field is required</Error>}
        </InputWrapper>
        <InputWrapper>
          <FormInput name="password" placeholder="password" ref={register} />
          {errors.password && <Error>This field is required</Error>}
        </InputWrapper>
        {isLoading ? (
          <SubmitWrapper>
            <Spinner color="white" />
          </SubmitWrapper>
        ) : (
          <>
            <SubmitWrapper>
              <SubmitButton type="submit" disabled={isLoading}>
                Update profile
              </SubmitButton>
            </SubmitWrapper>
            <SubmitWrapper>
              <Button
                title="Delete Profile"
                disabled={isLoading}
                onClick={() => setModalOpened(true)}
                color={theme.colors.whiteColor}
                backgroundColor={theme.colors.errorRed}
              />
            </SubmitWrapper>
          </>
        )}
      </StyledForm>
      <Modal opened={modalOpened} close={() => setModalOpened(false)}>
        {isLoading ? (
          <SubmitWrapper>
            <Spinner color="white" />
          </SubmitWrapper>
        ) : (
          <>
            <Heading size="h2">Are you sure you want to remove your profile?</Heading>
            <Button
              title="Delete Profile"
              disabled={isLoading}
              onClick={() => handleRemove()}
              color={theme.colors.whiteColor}
              backgroundColor={theme.colors.errorRed}
            />
            <Button
              title="Cancel"
              disabled={isLoading}
              onClick={() => setModalOpened(false)}
              noMargin
            />
          </>
        )}
      </Modal>
    </FormWrapper>
  );
};
export default ProfilePage;
