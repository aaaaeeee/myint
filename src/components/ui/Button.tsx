import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  width?: string;
  height?: string;
  color?: string;
  backgroundColor?: string;
  title?: string;
  maxWidth?: string;
  onClick?: () => void;
  disabled?: boolean;
  noMargin?: boolean;
}

const MainWrapper = styled.button<ButtonProps>`
  width: 100%;
  padding: 1rem 2rem;
  height: 5rem;
  border: none;
  font-size: 1.3rem;
  border-radius: 2rem;
  color: ${(props) => (props.color ? props.color : ({ theme }) => theme.colors.whiteColor)};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : ({ theme }) => theme.colors.main};
  margin-bottom: ${({ noMargin }) => (noMargin ? '0rem' : '3rem')};
  &:hover {
    font-weight: bold;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  disabled,
  color,
  backgroundColor,
  noMargin,
}) => {
  return (
    <MainWrapper
      type="button"
      onClick={onClick}
      disabled={disabled}
      color={color}
      backgroundColor={backgroundColor}
      noMargin={noMargin}
    >
      {title}
    </MainWrapper>
  );
};
export default Button;
