import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { ProductsState } from '../../shared/definitions/products';
import {
  fetchAddProductsThunk,
  fetchAllProductsThunk,
  fetchDeleteProductThunk,
  fetchRestoreProductThunk,
} from './productsOperations';
import { pending, rejected } from '../stateFunctions';

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  filter: '',
  isLoading: false,
  error: null,
};

const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilterProducts: (
      state: ProductsState,
      action: PayloadAction<string>
    ) => {
      state.filter = action.payload;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllProductsThunk.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAddProductsThunk.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(fetchDeleteProductThunk.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(fetchRestoreProductThunk.fulfilled, state => {
        state.isLoading = false;
      })

      .addMatcher(
        isAnyOf(
          fetchAllProductsThunk.pending,
          fetchAddProductsThunk.pending,
          fetchDeleteProductThunk.pending,
          fetchRestoreProductThunk.pending
        ),
        pending
      )
      .addMatcher(
        isAnyOf(
          fetchAllProductsThunk.rejected,
          fetchAddProductsThunk.rejected,
          fetchDeleteProductThunk.rejected,
          fetchRestoreProductThunk.rejected
        ),
        rejected
      );
  },
});
export const { setCurrentProduct, setFilterProducts } = ProductsSlice.actions;
export const ProductsReducer = ProductsSlice.reducer;
