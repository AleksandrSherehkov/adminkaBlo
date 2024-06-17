import { SerializedError } from '@reduxjs/toolkit';

export interface BodyParams {
  showDeletedItems: boolean;
}

export interface DefaultThunkApiConfig {
  rejectValue: SerializedError;
}

export interface Product {
  name: string;
  isSubscription: boolean;
  modifiedAt: string;
  deletedAt: string;
  oracleQuestions: number;
  compatibilityTests: number;
  natalCharts: number;
  providerProductId: string;
  showFullTexts: boolean | null;
  isDeleted: boolean;
}

export type NewProduct = Omit<
  Product,
  'isDeleted' | 'modifiedAt' | 'deletedAt'
>;

export interface GetProductsResponse extends Product {
  id: string;
}

export interface SaveProductResponse {
  id: string;
}

export interface ProductsState {
  products: GetProductsResponse[];
  currentProduct: GetProductsResponse | null;
  filter: string;
  isLoading: boolean;
  error: SerializedError | null;
}
