import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  width?: string;
  height?: string;
  textColor?: string;
  title: string;
  onClick: () => void;
}

const MainWrapper = styled.button`
  height: 45px;
  width: 140px;
`;
const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  return <MainWrapper onClick={onClick}>{title}</MainWrapper>;
};
export default Button;
