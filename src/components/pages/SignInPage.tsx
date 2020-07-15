import React from 'react';
import { useForm, FieldError } from 'react-hook-form';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import { DeepMap } from 'react-hook-form/dist/types/utils';
import { FormWrapper, StyledForm } from '../../layout/Container';
import Spinner from '../ui/Spinner';

interface SignInPageProps {}
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

const SignInPage: React.FC<SignInPageProps> = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { register, handleSubmit, errors } = useForm<FormData>();
  const firebase = useFirebase();
  const history = useHistory();
  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      setIsLoading(true);
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('**error');
    } finally {
      setIsLoading(false);
      history.push('/');
    }
  });
  return (
    <FormWrapper>
      <Title>Sign in</Title>
      <StyledForm onSubmit={onSubmit}>
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
              Sign In
            </SubmitButton>
          )}
        </SubmitWrapper>
      </StyledForm>
    </FormWrapper>
  );
};
export default SignInPage;
