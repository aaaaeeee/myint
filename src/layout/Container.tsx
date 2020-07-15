import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 140rem;
  height: 100%;
  margin: 0 auto;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 3rem 8rem;
  align-items: center;
  width: 100%;
  max-width: 50rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.main};
  box-shadow: 0rem 0.5rem 3.5rem ${({ theme }) => theme.colors.shadow};
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
