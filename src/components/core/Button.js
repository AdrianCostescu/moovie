import styled, { css } from "styled-components";
import { color } from "../../styles/color";

const BUTTON_FONT_SIZE = { small: 10, normal: 16 };

const BUTTON_SIZE = { small: "small", normal: "normal" };

const Button = styled.button.attrs((props) => ({
  fontSize: props.fontSize || "normal",
  buttonSize: props.buttonSize || "normal",
  ...props,
}))`
  flex: ${(props) => props.flex && "1 1 0px"};
  color: ${color.white};
  text-align: center;
  border-radius: 8px;
  border: 0;
  font-size: ${(props) => BUTTON_FONT_SIZE[props.fontSize]}px;
  font-weight: 500;

  ${(props) =>
    props.buttonSize === BUTTON_SIZE.small
      ? css`
          padding: 8px;
        `
      : css`
          padding: 12px 24px;
        `}

  &:disabled {
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: ${color.redRibbon};

  &:hover {
    background-color: ${color.shiraz};
  }
`;

const SecondaryButton = styled(Button)`
  background-color: ${color.shark};

  &:hover {
    background-color: ${color.shipGray};
  }
`;

const TransparentButton = styled(Button)`
  background-color: transparent;
  color: ${color.ebony};
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

export { PrimaryButton, SecondaryButton, TransparentButton };
