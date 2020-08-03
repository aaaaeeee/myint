import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm, FieldError } from 'react-hook-form';
import { DeepMap } from 'react-hook-form/dist/types/utils';

import Button from '../ui/Button';
import Modal from '../common/Modal/Modal';
import Spinner from '../ui/Spinner';
import Heading from '../ui/Heading';

import { StyledForm } from '../../layout/Container';

interface AddInterestProps {}
type FormData = {
  interest: string;
};
type StyleProps = {
  show?: DeepMap<FormData, FieldError>;
};
const MainWrapper = styled.div``;
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
const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  height: 5rem;
  border: none;
  font-size: 1.3rem;
  border-radius: 2rem;
  color: ${({ theme }) => theme.colors.whiteColor};
  background-color: ${({ theme }) => theme.colors.main};
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

const AddInterest: React.FC<AddInterestProps> = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const { register, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = handleSubmit(async ({ interest }) => {
    try {
      setIsLoading(true);
      console.log('****ASDF', interest);

      setIsLoading(false);
    } catch ({ code }) {
      setIsLoading(false);
    }
  });
  return (
    <MainWrapper>
      <Button title="Add Interest" onClick={() => setIsOpened(true)} />
      <Modal opened={isOpened} close={() => setIsOpened(false)}>
        <>
          <Heading size="h2">Add new interest?</Heading>
          <StyledForm onSubmit={onSubmit}>
            <InputWrapper>
              <FormInput
                name="interest"
                placeholder="Add your Interest..."
                ref={register({ required: true })}
              />
              {errors.interest && <Error show={errors}>This field is required</Error>}
            </InputWrapper>
            <SubmitWrapper>
              {isLoading ? (
                <Spinner color="white" />
              ) : (
                <SubmitButton type="submit" disabled={isLoading}>
                  Add Interest
                </SubmitButton>
              )}
            </SubmitWrapper>
          </StyledForm>
          <Button title="Cancel" disabled={isLoading} onClick={() => setIsOpened(false)} noMargin />
        </>
      </Modal>
    </MainWrapper>
  );
};
export default AddInterest;
