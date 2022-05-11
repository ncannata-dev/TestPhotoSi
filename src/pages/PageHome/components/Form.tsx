import React, { ChangeEvent, FC, memo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { UIButton } from "../../../components/Button";
import { UIInput } from "../../../components/Input";
import { addNewProduct } from "../../../redux-modules/actions";

// #region ::: PARTIALS
const Wrapper = styled.div`
  display: flex;
  flex: 1;
  border: 1px solid blue;
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
  flex-direction: column;
  position: relative;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  flex: 1;
  @media (max-width: 672px) {
    flex-direction: column;
  }
`;

const Column = styled.div<{ flex: number; center?: boolean }>`
  display: flex;
  flex: ${(props: any) => props.flex};
  padding: 0 1rem;
  align-items: center;
  @media (max-width: 768px) {
    justify-content: ${(props: any) => props.center && "center"};
    margin-top: ${(props: any) => (props.center ? "1rem" : "0.5rem")};
  }
`;

const Header = styled.span`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
`;

const CustomIconComponent = styled(FontAwesomeIcon)`
  position: absolute;
  cursor: pointer;
  right: 1rem;
  background-color: #6666ff;
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  padding: 0.2rem;
  color: white;

  &:hover {
    background-color: #4545ff;
    color: white;
    cursor: pointer;
  }
`;
// #endregion

interface Props {
  onCloseForm: () => void;
}

export const Form: FC<Props> = memo(({ onCloseForm }): JSX.Element => {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const isDisabled = !productName || !productCategory;

  const onChangeProductName = (event: ChangeEvent<HTMLInputElement>) =>
    setProductName(event.target.value);

  const onChangeProductCategory = (event: ChangeEvent<HTMLInputElement>) =>
    setProductCategory(event.target.value);

  const onConfirmNewProduct = () => {
    dispatch(addNewProduct({ title: productName, category: productCategory }));
    onCloseForm();
  };

  return (
    <Wrapper id="form">
      <Header>Inserisci nuovo prodotto</Header>
      <CustomIconComponent
        icon={faClose}
        onClick={onCloseForm}
        id="icon-close"
      />
      <Row>
        <Column flex={1}>
          <UIInput
            value={productName}
            onChange={onChangeProductName}
            fluid
            placeholder="Inserisci nome"
            label="Nome"
            id="form-name-input"
          />
        </Column>
        <Column flex={1}>
          <UIInput
            value={productCategory}
            onChange={onChangeProductCategory}
            fluid
            placeholder="Inserisci categoria"
            label="Categoria"
            id="form-category-input"
          />
        </Column>
        <Column flex={0.1} center>
          <UIButton
            text="Conferma"
            onClick={onConfirmNewProduct}
            icon={faCheck}
            disabled={isDisabled}
            id="form-button"
          />
        </Column>
      </Row>
    </Wrapper>
  );
});
