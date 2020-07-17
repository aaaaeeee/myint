import React from 'react';
import styled, { css } from 'styled-components';

interface HeadingProps {
  color?: string;
  noMargin?: boolean;
  bold?: boolean;
  size?: string;
  children?: React.ReactNode;
}

const baseStyle = css<HeadingProps>`
  color: ${(props) => (props.color ? props.color : ({ theme }) => theme.colors.main)};
  font-weight: ${({ bold }) => (bold ? '700' : '300')};
  margin-top: 0;
  letter-spacing: 1px;
  margin-bottom: ${({ noMargin }) => (noMargin ? '0rem' : '3rem')};
`;

const Heading1 = styled.h1`
  font-size: 2.5rem;
  text-transform: uppercase;
  ${baseStyle}
`;

const Heading2 = styled.h2`
  font-size: 1.8rem;
  ${baseStyle}
`;

const Heading3 = styled.h3`
  font-size: 1.5rem;
  ${baseStyle}
`;

const Heading4 = styled.h4`
  font-size: 1.3rem;
  ${baseStyle}
`;

const Heading: React.FC<HeadingProps> = ({ children, color, noMargin, bold, size }) => {
  if (size === 'h2') {
    return (
      <Heading2 noMargin={noMargin} bold={bold} color={color}>
        {children}
      </Heading2>
    );
  }

  if (size === 'h3') {
    return (
      <Heading3 noMargin={noMargin} bold={bold} color={color}>
        {children}
      </Heading3>
    );
  }

  if (size === 'h4') {
    return (
      <Heading4 noMargin={noMargin} bold={bold} color={color}>
        {children}
      </Heading4>
    );
  }

  return (
    <Heading1 noMargin={noMargin} bold={bold} color={color}>
      {children}
    </Heading1>
  );
};

export default Heading;
