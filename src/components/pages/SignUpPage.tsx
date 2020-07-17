import React from 'react';
import { useForm, FieldError } from 'react-hook-form';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { DeepMap } from 'react-hook-form/dist/types/utils';
import { FormWrapper, StyledForm } from '../../layout/Container';
import Spinner from '../ui/Spinner';

interface SignUpPageProps {}
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

const SubmitWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 5rem;
  margin-top: 3rem;
  align-items: center;
`;

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [firebaseErrors, setFirebaseErrors] = React.useState('');
  const { register, handleSubmit, errors } = useForm<FormData>();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const history = useHistory();
  const onSubmit = handleSubmit(async ({ email, password }) => {
    setIsLoading(true);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        return firestore.collection('users').doc(resp.user?.uid).set({
          email,
          username: email,
        });
      })
      .then(() => {
        setIsLoading(false);
        history.push('/');
      })
      .catch(({ code }) => {
        setFirebaseErrors(code);
        setIsLoading(false);
      });
  });
  return (
    <FormWrapper>
      <Title>Sign up here</Title>
      <StyledForm onSubmit={onSubmit}>
        {firebaseErrors && <Error>{firebaseErrors}</Error>}
        <InputWrapper>
          <FormInput name="email" placeholder="username" ref={register({ required: true })} />
          {errors.email && <Error show={errors}>This field is required</Error>}
        </InputWrapper>
        <InputWrapper>
          <FormInput name="password" placeholder="password" ref={register({ required: true })} />
          {errors.password && <Error>This field is required</Error>}
        </InputWrapper>
        <SubmitWrapper>
          {isLoading ? (
            <Spinner color="white" />
          ) : (
            <SubmitButton type="submit" disabled={isLoading}>
              Sign Up
            </SubmitButton>
          )}
        </SubmitWrapper>
      </StyledForm>
    </FormWrapper>
  );
};
export default SignUpPage;
