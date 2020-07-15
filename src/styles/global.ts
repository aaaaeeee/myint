import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
${(props) => css`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
  }

  *:focus {
    outline: 0;
    outline: none;
  }

  html {
    /* fontsize is put to 62.5 so you can use rem units in styling
    now 1rem equliase 10px */
    font-size: 62.5%;
    box-sizing: border-box;

    @media ${props.theme.mediaQueries.small} {
      font-size: 60%;
    }

    @media ${props.theme.mediaQueries.smallest} {
      font-size: 55%;
    }
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    line-height: 1.6;
  }

  a,
  button {
    cursor: pointer;
  }

  a,
  input,
  textarea,
  button {
    outline: none;
    text-decoration: none;
    font-family: inherit;
  }
`}`;
