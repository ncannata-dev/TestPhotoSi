import React, { ChangeEvent, FC, memo } from "react";
import styled from "styled-components";

// #region ::: PARTIALS
interface PropsWrapper {
  fluid?: boolean;
  customWidth?: string;
  isEditMode?: boolean;
}

const Wrapper = styled.div<PropsWrapper>`
  display: flex;
  flex-direction: column;
  ${({ fluid }): string | false | undefined => fluid && `width: 100%;`};
  ${({ customWidth }): string | false | undefined =>
    customWidth && `width: ${customWidth};`};
`;

const Input = styled.input<PropsInput>`
  border: 1px solid #eee;
  border-radius: 0.25rem;
  background-color: transparent;
  outline: none;
  padding: ${({ isEditMode }): string | false | undefined =>
    isEditMode ? `width: 100%;` : "12px 3px 12px 15px"};
  font-size: 16px;
  font-family: "Josefin Sans";
  ${({ fluid }): string | false | undefined => fluid && `width: 100%;`};
  ${({ customWidth }): string | false | undefined =>
    customWidth && `width: ${customWidth};`};

  &:focus {
    outline: none;
    box-shadow: 0px 0px 2px #6666ff;
  }
`;

const Span = styled.span`
  text-align: center;
  margin-bottom: 5px;
`;
// #endregion

interface PropsInput {
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  fluid?: boolean;
  customWidth?: string;
  label?: string;
  placeholder?: string;
  isEditMode?: boolean;
  id?: string;
}

export const UIInput: FC<PropsInput> = memo(
  ({
    value,
    onChange,
    fluid = false,
    customWidth,
    label,
    placeholder,
    isEditMode = false,
    id = "input",
  }): JSX.Element => (
    <Wrapper
      fluid={fluid}
      customWidth={customWidth}
      isEditMode={isEditMode}
      id="WrapperInput"
    >
      {label && <Span>{label}</Span>}
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isEditMode={isEditMode}
        id={id}
      />
    </Wrapper>
  )
);
