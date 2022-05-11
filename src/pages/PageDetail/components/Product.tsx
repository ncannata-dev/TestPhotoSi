import React, { ChangeEvent, FC, memo, useState } from "react";
import {
  faArrowCircleLeft,
  faCheck,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { TProduct } from "../../../declarations/general";
import { UIButton } from "../../../components/Button";
import { UIInput } from "../../../components/Input";
import { UITextarea } from "../../../components/TextArea";
import { editProduct } from "../../../redux-modules/actions";

// #region ::: PARTIALS
const Wrapper = styled.div`
  margin: 0 2rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid grey;
  padding: 1rem 0;
  min-height: 2rem;
  flex-shrink: 1;
`;

const Column = styled.div`
  display: flex;
  flex: 1;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
`;

const WarningText = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: orangered;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;

  @media (max-width: 465px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const GroupButtonFooter = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 672px) {
    display: flex;
    flex-direction: column;
  }
`;

const GenericButtonWrapper = styled.div`
  @media (max-width: 465px) {
    margin-top: 1.5rem;
  }
`;

const BackButtonWrapper = styled.div`
  @media (min-width: 465px) and (max-width: 672px) {
    margin-bottom: 1rem;
  }
  @media (min-width: 672px) {
    margin-right: 1rem;
  }
`;
// #endregion

interface Props {
  product: TProduct;
}

export const Product: FC<Props> = memo(({ product }): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const handleEditingMode = () => setIsEditingMode(!isEditingMode);

  const { title, category, description, price, rating, id } = product;

  const [titleValue, setTitleValue] = useState(title || "");
  const [categoryValue, setCategoryValue] = useState(category || "");
  const [descriptionValue, setDescriptionValue] = useState(description || "");
  const [priceValue, setPriceValue] = useState(price?.toString() || "");
  const [ratingValue, setRatingValue] = useState(rating?.toString() || "");

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) =>
    setTitleValue(event.target.value);
  const onChangeCategory = (event: ChangeEvent<HTMLInputElement>) =>
    setCategoryValue(event.target.value);
  const onChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setDescriptionValue(event.target.value);
  const onChangePrice = (event: ChangeEvent<HTMLInputElement>) =>
    setPriceValue(event.target.value);
  const onChangeRating = (event: ChangeEvent<HTMLInputElement>) =>
    setRatingValue(event.target.value);

  const isConfirmEditDisable =
    title === titleValue &&
    category === categoryValue &&
    (description || "") === descriptionValue &&
    (price?.toString() || "") === priceValue?.toString() &&
    (rating?.toString() || "") === ratingValue.toString();

  const onConfirmEdit = () => {
    dispatch(
      editProduct({
        id,
        title: titleValue,
        category: categoryValue,
        description: descriptionValue,
        price: priceValue,
        rating: ratingValue,
        isEditable: true,
      })
    );
    navigate("/");
  };

  return (
    <Wrapper>
      <Row>
        <Column>Nome</Column>
        <Column>
          {!isEditingMode ? (
            <span>{titleValue}</span>
          ) : (
            <UIInput
              value={titleValue}
              onChange={onChangeTitle}
              isEditMode={isEditingMode}
              fluid
            />
          )}
        </Column>
      </Row>
      <Row>
        <Column>Categoria</Column>
        <Column>
          {!isEditingMode ? (
            <span>{categoryValue}</span>
          ) : (
            <UIInput
              value={categoryValue}
              onChange={onChangeCategory}
              isEditMode={isEditingMode}
              fluid
            />
          )}
        </Column>
      </Row>
      <Row>
        <Column>Descrizione</Column>
        <Column>
          {!isEditingMode ? (
            <span>{descriptionValue}</span>
          ) : (
            <UITextarea
              value={descriptionValue}
              onChange={onChangeDescription}
              isEditMode={isEditingMode}
              fluid
            />
          )}
        </Column>
      </Row>
      <Row>
        <Column>Prezzo</Column>
        <Column>
          {!isEditingMode ? (
            <span>{priceValue}</span>
          ) : (
            <UIInput
              value={priceValue}
              onChange={onChangePrice}
              isEditMode={isEditingMode}
              fluid
            />
          )}
        </Column>
      </Row>
      <Row>
        <Column>Rating</Column>
        <Column>
          {!isEditingMode ? (
            <span>{ratingValue}</span>
          ) : (
            <UIInput
              value={ratingValue}
              onChange={onChangeRating}
              isEditMode={isEditingMode}
              fluid
            />
          )}
        </Column>
      </Row>
      {product.isEditable ?? (
        <WarningText>
          Questo contenuto non è editabile in quanto proveniente da un servizio
          esterno
        </WarningText>
      )}
      <Footer>
        <GroupButtonFooter>
          <BackButtonWrapper>
            <GenericButtonWrapper>
              <UIButton
                text="Indietro"
                onClick={goBack}
                icon={faArrowCircleLeft}
              />
            </GenericButtonWrapper>
          </BackButtonWrapper>
          <GenericButtonWrapper>
            <UIButton
              text="Modifica"
              onClick={handleEditingMode}
              icon={faPencil}
              disabled={!product.isEditable}
            />
          </GenericButtonWrapper>
        </GroupButtonFooter>
        <GenericButtonWrapper>
          <UIButton
            text="Conferma"
            onClick={onConfirmEdit}
            icon={faCheck}
            disabled={isConfirmEditDisable}
          />
        </GenericButtonWrapper>
      </Footer>
    </Wrapper>
  );
});
