import axios from 'axios';
import { handleError } from './errorHandler';
import {
  CurrentUser,
  SignInData,
  SignOutData,
  User,
} from '../shared/definitions/auth';
import { LogoutThunk } from '../redux/auth/authOperations';
import {
  BodyParams,
  GetProductsResponse,
  NewProduct,
  SaveProductResponse,
} from '../shared/definitions/products';
import {
  LoadAppFeaturesUsageResponse,
  LoadSalesResponse,
  LoadStatisticsRequest,
  LoadUsersActivityResponse,
} from '../shared/definitions/statistics';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + 'api/v1',
});

instance.interceptors.response.use(
  res => res,
  async error => {
    const url = error.request?.responseURL?.toLowerCase() ?? '';
    if (
      url.indexOf('/auth/refresh') < 0 &&
      url.indexOf('/auth/logout') < 0 &&
      [401, 403].indexOf(error.response?.status ?? 0) > -1
    ) {
      const storageData = readAuthStorage();
      if (!storageData.refreshToken.length) {
        return Promise.reject(error);
      }

      try {
        const { data } = await instance.post('/auth/refresh', {
          refreshToken: storageData.refreshToken,
        });

        setAuthToken(data.accessToken);
        writeAuthStorage(data);

        error.config.headers['Authorization'] = combineAuthToken(
          data.accessToken,
        );

        return instance(error.config);
      } catch (refreshError) {
        const res = await import('../redux/store');
        res.store.dispatch(LogoutThunk());
      }
    }
    return Promise.reject(error);
  },
);

export const signIn = async (params: User): Promise<SignInData> => {
  try {
    const { data } = await instance.post<SignInData>('/auth/login', params);

    setAuthToken(data.accessToken);
    writeAuthStorage(data);

    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const checkAlive = async () => {
  try {
    const { data } = await instance.get('/auth/check-alive');

    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const loadLoginData = async (): Promise<CurrentUser> => {
  try {
    const { data } = await instance.get('/auth/load-login-data');
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const signOut = async (): Promise<SignOutData> => {
  try {
    await instance.post('/auth/logout');
  } catch (error: unknown) {
    handleError(error);
  } finally {
    clearAuthToken();
    clearAuthStorage();
    return { message: 'Successfully signed out' };
  }
};

export const importData = async (file: File, url: string): Promise<any> => {
  const formData = new FormData();
  formData.append('importFile', file);
  try {
    const { data } = await instance.put(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const combineAuthToken = (token: string) => {
  return `Bearer ${token}`;
};

export const setAuthToken = (token: string) => {
  instance.defaults.headers.common.Authorization = combineAuthToken(token);
};

export const clearAuthToken = () => {
  instance.defaults.headers.common.Authorization = ``;
};

export const writeAuthStorage = (data: SignInData) => {
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
};

export const readAuthStorage = (): SignInData => {
  var res = new SignInData();
  res.accessToken = localStorage.getItem('accessToken') ?? '';
  res.refreshToken = localStorage.getItem('refreshToken') ?? '';
  return res;
};

export const clearAuthStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

/**
  |============================
  | auth Products
  |============================
*/

export const getProducts = async (
  filterQuery?: BodyParams,
): Promise<GetProductsResponse[]> => {
  try {
    const { data } = await instance.post<GetProductsResponse[]>(
      '/ecommerce/products/get-list',
      filterQuery,
    );
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const addProduct = async (
  product: NewProduct,
): Promise<SaveProductResponse> => {
  try {
    const { data } = await instance.post<SaveProductResponse>(
      '/ecommerce/products/save',
      product,
    );
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await instance.delete(`/ecommerce/products/delete`, {
      params: { id },
    });
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const restoreProduct = async (id: string) => {
  try {
    await instance.patch(`/ecommerce/products/restore`, null, {
      params: { id },
    });
  } catch (error) {
    handleError(error);
    throw error;
  }
};

/**
  |============================
  | auth Statistics
  |============================
*/

export const loadSalesStatistics = async (
  params: LoadStatisticsRequest,
): Promise<LoadSalesResponse[]> => {
  try {
    const { data } = await instance.post<LoadSalesResponse[]>(
      '/statistics/load-sales',
      params,
    );
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const loadUsersActivity = async (
  params: LoadStatisticsRequest,
): Promise<LoadUsersActivityResponse[]> => {
  try {
    const { data } = await instance.post<LoadUsersActivityResponse[]>(
      '/statistics/load-users-activity',
      params,
    );
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const loadAppFeaturesUsage = async (
  params: LoadStatisticsRequest,
): Promise<LoadAppFeaturesUsageResponse[]> => {
  try {
    const { data } = await instance.post<LoadAppFeaturesUsageResponse[]>(
      '/statistics/load-app-features-usage',
      params,
    );
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};
