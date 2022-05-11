import React, { FC, memo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { TProduct } from "../../../declarations/general";

// #region ::: PARTIALS
const Wrapper = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-left: 10px;
  flex-direction: column;

  &:hover {
    background-color: #6666ff;
    color: white;
    cursor: pointer;
  }
`;
// #endregion

interface Props {
  product: TProduct;
}

export const ProductRow: FC<Props> = memo(({ product }) => {
  const navigate = useNavigate();

  const goToDetail = () => navigate(`/detail/${product.id}`);

  return (
    <Wrapper onClick={goToDetail}>
      <span id="product-row-name">Nome: {product.title}</span>
      <span id="product-row-category">Categoria: {product.category} </span>
    </Wrapper>
  );
});
