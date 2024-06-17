import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { ProductsReducer } from "./products/ProductsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: ProductsReducer, 
  },
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;