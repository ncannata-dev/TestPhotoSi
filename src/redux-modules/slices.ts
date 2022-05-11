import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStore } from "../declarations/general";

export const sliceProducts = createSlice({
  name: "productsSlice",
  initialState: {},
  reducers: {
    setProductList: (state, action: PayloadAction<TStore["products"]>) => {
      return { ...state, ...action.payload };
    },
    addNewProduct: (
      state,
      action: PayloadAction<{ title: string; category: string }>
    ) => {
      const index = Object.values(state).length + 1;
      return {
        ...state,
        [index]: { id: index, ...action.payload, isEditable: true },
      };
    },
    editProduct: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    },
  },
});
