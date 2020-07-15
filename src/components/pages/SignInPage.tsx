import React from 'react';
import { useForm, FieldError } from 'react-hook-form';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import { DeepMap } from 'react-hook-form/dist/types/utils';
import { FormWrapper, StyledForm } from '../../layout/Container';

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
  margin-top: 3rem;
  border: none;
  font-size: 1.3rem;
  border-radius: 2rem;
  color: ${({ theme }) => theme.colors.main};
  &:disabled {
    cursor: not-allowed;
  }
`;

const SignInPage: React.FC<SignInPageProps> = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { register, handleSubmit, errors } = useForm<FormData>();
  const firebase = useFirebase();
  const history = useHistory();
  const onSubmit = handleSubmit(async ({ email, password }) => {
    setIsLoading(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        setIsLoading(false);
      })
      .catch((error) => {});
    history.push('/');
  });
  return (
    <FormWrapper>
      <Title>Sign in</Title>
      <StyledForm onSubmit={onSubmit}>
        <InputWrapper>
          <FormInput
            name="email"
            placeholder="username"
            ref={register({ required: true })}
          />
          {errors.email && <Error show={errors}>This field is required</Error>}
        </InputWrapper>
        <InputWrapper>
          <FormInput
            name="password"
            placeholder="password"
            ref={register({ required: true })}
          />

          {errors.password && <Error>This field is required</Error>}
        </InputWrapper>
        <InputWrapper>
          <SubmitButton type="submit" disabled={isLoading}>
            Sign In
          </SubmitButton>
        </InputWrapper>
      </StyledForm>
    </FormWrapper>
  );
};
export default SignInPage;
