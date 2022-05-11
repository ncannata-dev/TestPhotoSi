import React, { FC, memo, useCallback } from "react";
import styled from "styled-components";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// #region ::: PARTIALS
interface PropsButton {
  disabled: Props["disabled"];
}

const Button = styled.div<PropsButton>`
  background-color: ${({ disabled }) => (disabled ? "grey" : "#6666ff")};
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 2.7rem;
  padding: 0 1rem;
  &:hover {
    ${({ disabled }) => !disabled && "background-color:#4545ff"};
    color: white;
    cursor: ${({ disabled }) => (disabled ? "not-allowed;" : "pointer")};
  }
`;

const Text = styled.div`
  color: white;
`;
// #endregion

interface Props {
  icon?: IconDefinition;
  text: string;
  onClick: () => void;
  disabled?: boolean;
  id?: string;
}

export const UIButton: FC<Props> = memo(
  ({ text, icon, onClick, disabled, id = "button" }): JSX.Element => {
    const onClickButton = useCallback(() => {
      if (!disabled) onClick();
    }, [disabled, onClick]);

    return (
      <Button onClick={onClickButton} disabled={disabled} id={id}>
        <Text>{text}</Text>
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            color="white"
            style={{ paddingBottom: 3, paddingLeft: 5 }}
          />
        )}
      </Button>
    );
  }
);
