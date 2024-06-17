import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  GetProductsResponse,
  BodyParams,
  DefaultThunkApiConfig,
  NewProduct,
  SaveProductResponse,
} from '../../shared/definitions/products';
import {
  addProduct,
  deleteProduct,
  getProducts,
  restoreProduct,
} from '../../services/api';
import { handleAxiosError } from '../helpers/handleAxiosError';
import { RootState } from '../store';

export const fetchAllProductsThunk = createAsyncThunk<
  GetProductsResponse[],
  BodyParams,
  DefaultThunkApiConfig
>('products/fetchAllProducts', async (params, { rejectWithValue }) => {
  try {
    const data = await getProducts(params);
    return data;
  } catch (error) {
    const serializedError = handleAxiosError(error);
    return rejectWithValue(serializedError);
  }
});

export const fetchAddProductsThunk = createAsyncThunk<
  SaveProductResponse,
  NewProduct,
  DefaultThunkApiConfig
>(
  'products/fetchAddProducts',
  async (product, { rejectWithValue }) => {
    try {
      const data = await addProduct(product);
      return data;
    } catch (error) {
      const serializedError = handleAxiosError(error);
      return rejectWithValue(serializedError);
    }
  }
);

export const fetchDeleteProductThunk = createAsyncThunk<
  void,
  string,
  DefaultThunkApiConfig
>(
  'products/fetchDeleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await deleteProduct(productId);
    } catch (error) {
      const serializedError = handleAxiosError(error);
      return rejectWithValue(serializedError);
    }
  },
  {
    condition: (_, { getState }) => {
      const loading = (getState() as RootState).products.isLoading;
      if (loading) {
        console.log(
          'Aborting fetchDeleteProductThunk because the system is already loading.'
        );
        return false;
      }
    },
  }
);

export const fetchRestoreProductThunk = createAsyncThunk<
  void,
  string,
  DefaultThunkApiConfig
>(
  'products/fetchRestoreProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await restoreProduct(productId);
    } catch (error) {
      const serializedError = handleAxiosError(error);
      return rejectWithValue(serializedError);
    }
  },
  {
    condition: (_, { getState }) => {
      const loading = (getState() as RootState).products.isLoading;
      if (loading) {
        console.log(
          'Aborting fetchRestoreProductThunk because the system is already loading.'
        );
        return false;
      }
    },
  }
);
