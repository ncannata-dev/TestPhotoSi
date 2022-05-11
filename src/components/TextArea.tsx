import React, { ChangeEvent, FC, memo } from "react";
import styled from "styled-components";

// #region :::PARTIALS
const Wrapper = styled.textarea<Props>`
  border: 1px solid #eee;
  border-radius: 0.25rem;
  background-color: transparent;
  outline: none;
  padding: ${({ isEditMode }): string | false | undefined =>
    isEditMode ? `width: 100%;` : "12px 3px 12px 15px"};
  font-size: 16px;
  ${({ fluid }): string | false | undefined => fluid && `width: 100%;`};
  font-family: "Josefin Sans", cursive;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 2px #6666ff;
  }
`;
// #endregion

interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  isEditMode?: boolean;
  fluid?: boolean;
}

export const UITextarea: FC<Props> = memo(
  ({ value, onChange, isEditMode = false, fluid = false }): JSX.Element => (
    <Wrapper
      value={value}
      onChange={onChange}
      isEditMode={isEditMode}
      fluid={fluid}
    />
  )
);
