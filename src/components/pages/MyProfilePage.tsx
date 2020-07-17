import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useForm, FieldError } from 'react-hook-form';
import { DeepMap } from 'react-hook-form/dist/types/utils';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { RootState } from '../../store/rootReducer';
import { FormWrapper, StyledForm } from '../../layout/Container';
import Spinner from '../ui/Spinner';
import Modal from '../modal/Modal';

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
`;

const Error = styled.div<StyleProps>`
  color: ${({ theme }) => theme.colors.errorRed};
  font-size: 1.3rem;
  font-weight: bold;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 2.5rem;
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
  &:hover {
    font-weight: bold;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const DeleteButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  height: 5rem;
  border: none;
  font-size: 1.3rem;
  border-radius: 2rem;
  color: ${({ theme }) => theme.colors.errorRed};
  background-color: white;
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
  height: 5rem;
  margin-top: 3rem;
  align-items: center;
`;

const ModalWrapper = styled.div`
  margin: 2rem 0rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalText = styled.p`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.errorRed};
  text-align: center;
  margin-bottom: 2rem;
`;

const ModalDeleteButton = styled.button`
  width: 100%;
  max-width: 35rem;
  padding: 1rem 2rem;
  height: 5rem;
  border: none;
  font-size: 1.3rem;
  border-radius: 2rem;
  color: white;
  background-color: ${({ theme }) => theme.colors.errorRed};
  &:hover {
    font-weight: bold;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const ProfilePage: React.FC<ProfilePageProps> = () => {
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
    const user = firebase.auth().currentUser;
    try {
      await user?.delete();
      await firestore.collection('users').doc(uid).delete();
      setIsLoading(false);
    } catch ({ code }) {
      setFirebaseErrors(code);
      setIsLoading(false);
    }
  };
  return (
    <FormWrapper>
      <Title>Hello {profile.email} edit you profile</Title>
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
        <SubmitWrapper>
          {isLoading ? (
            <Spinner color="white" />
          ) : (
            <SubmitButton type="submit" disabled={isLoading}>
              Update profile
            </SubmitButton>
          )}
        </SubmitWrapper>
        <SubmitWrapper>
          <Modal
            activator={({ setShow }) => (
              <DeleteButton type="button" onClick={() => setShow(true)} disabled={isLoading}>
                Delete profile
              </DeleteButton>
            )}
          >
            <ModalWrapper>
              <ModalText>Are you sure you want to delete your profile?</ModalText>
              <ModalDeleteButton type="button" onClick={() => handleRemove()} disabled={isLoading}>
                Delete
              </ModalDeleteButton>
            </ModalWrapper>
          </Modal>
        </SubmitWrapper>
      </StyledForm>
    </FormWrapper>
  );
};
export default ProfilePage;
