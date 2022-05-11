import React, { ChangeEvent, FC, memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import { UIInput } from "../../components/Input";
import { ProductList } from "./components/ProductList";
import { UIButton } from "../../components/Button";
import { Form } from "./components/Form";
import { setProductList } from "../../redux-modules/actions";
import { apiExternalData } from "../../api/apiExternalData";

// #region ::: PARTIALS
const Wrapper = styled.div`
  background-color: #f2f2f2;
  border-radius: 1rem;
  padding: 1rem;
  max-width: 1400px;
  justify-content: center;
  margin: 0 auto;
  margin-top: 2rem;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-self: center;
  flex-direction: row;
  padding: 1rem 0rem;
`;

const SearchBarColumn = styled.div<{ flex: number }>`
  display: flex;
  flex: ${({ flex }) => flex};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex: 1;
`;
// #endregion

const PageHome: FC = memo((): JSX.Element => {
  const [productFilter, setProductFilter] = useState("");
  const [idAddingMode, setIsAddingMode] = useState(false);
  const dispatch = useDispatch();

  const onChangeProductFilter = (event: ChangeEvent<HTMLInputElement>) =>
    setProductFilter(event.target.value);

  const handleAddingMode = () => setIsAddingMode(!idAddingMode);

  const getData = async () => {
    const results = await apiExternalData();
    dispatch(setProductList(results));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <SearchBarWrapper>
        <SearchBarColumn flex={3}>
          <UIInput
            value={productFilter}
            onChange={onChangeProductFilter}
            fluid
            label="Cerca per..."
            placeholder="Nome o categoria"
          />
        </SearchBarColumn>
        <SearchBarColumn flex={1}>
          <ButtonWrapper>
            <UIButton
              text="Aggiungi"
              icon={faCirclePlus}
              onClick={handleAddingMode}
            />
          </ButtonWrapper>
        </SearchBarColumn>
      </SearchBarWrapper>
      {idAddingMode && <Form onCloseForm={handleAddingMode} />}
      <ProductList productFilter={productFilter} />
    </Wrapper>
  );
});

export default PageHome;
