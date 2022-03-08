import { normalize } from "polished";
import { createGlobalStyle, css } from "styled-components";

function Campton() {
  return css`
    @font-face {
      font-family: "Campton";
      src: url("/fonts/CamptonLight.otf") format("otf");
      font-weight: 700;
      font-style: normal;
    }
  `;
}

export const GlobalStyle = createGlobalStyle`
    ${() => css`
      ${normalize()};
      ${Campton()};

      html {
        font-family: "Campton";
        font-weight: 700;
        font-size: 16px;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      p,
      span {
        line-height: 22px;
      }

      h1 {
        line-height: 60px;
      }
    `}
`;
