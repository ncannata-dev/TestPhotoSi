import { configureStore } from "@reduxjs/toolkit";
import { reducerProducts } from "./reducers";

export const store = configureStore({
  reducer: {
    products: reducerProducts,
  },
});
