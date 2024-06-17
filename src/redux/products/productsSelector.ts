import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getProducts = (state: RootState) => state.products.products;

const getFilter = (state: RootState) => state.products.filter;

export const selectAllProducts = getProducts;
export const filterValueProducts = getFilter;

export const selectIsLoadingProducts = (state: RootState) =>
  state.products.isLoading;
export const selectError = (state: RootState) => state.products.error;

export const selectCurrentProduct = (state: RootState) =>
  state.products.currentProduct;

export const selectProductsFilter = createSelector(
  [getProducts, getFilter],
  (products, filter) => products?.find(product => product.name === filter)
);
