import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './shared/components/SharedLayout';

import LoginPage from './pages/LoginPage';

import { lazy } from 'react';
import { PublicRoute } from './shared/routes/PublicRoute';
import DashboardPage from './pages/DashboardPage';
import { ProtectedRoute } from './shared/routes/ProtectedRoute';
import { useAppDispatch, useAppSelector } from './redux/hook';
import {
  selectIsLoading,
  selectIsRefreshing,
} from './redux/auth/authSelectors';
import { LoadLoginDataThunk } from './redux/auth/authOperations';
import { init } from './redux/auth/authSlice';
import { Spinner } from '@nextui-org/react';
import { selectIsLoadingProducts } from './redux/products/productsSelector';

const ProductPage = lazy(() => import('./pages/ProductPage'));
const MonthsPage = lazy(() => import('./pages/MonthsPage'));
const YearsPage = lazy(() => import('./pages/YearsPage'));
const CompatibilityCombinationsPage = lazy(
  () => import('./pages/CompatibilityCombinationsPage'),
);
const PersonalitiesPage = lazy(() => import('./pages/PersonalitiesPage'));
const DailyRecommendationsPage = lazy(
  () => import('./pages/DailyRecommendationsPage'),
);
const YearlyRecommendationsPage = lazy(
  () => import('./pages/YearlyRecommendationsPage'),
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
let isChecked = false;

export const App = () => {
  const dispatch = useAppDispatch();
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const isLoading = useAppSelector(selectIsLoading);
  const isLoadingProducts = useAppSelector(selectIsLoadingProducts);

  if (!isChecked) {
    isChecked = true;
    dispatch(init());
    dispatch(LoadLoginDataThunk());
  }

  return (
    <>
      {(isRefreshing || isLoading || isLoadingProducts) && (
        <div className="z-[90] fixed h-full w-full bg-black/30 ">
          <Spinner
            size="lg"
            label="Loading..."
            color="warning"
            className="absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      )}
      <Routes>
        <Route
          path="/login"
          element={<PublicRoute component={LoginPage} redirectTo="/" />}
        />
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <ProtectedRoute component={DashboardPage} redirectTo="/login" />
            }
          />
          <Route
            path="products"
            element={
              <ProtectedRoute component={ProductPage} redirectTo="/login" />
            }
          />
          <Route
            path="months"
            element={
              <ProtectedRoute component={MonthsPage} redirectTo="/login" />
            }
          />
          <Route
            path="years"
            element={
              <ProtectedRoute component={YearsPage} redirectTo="/login" />
            }
          />
          <Route
            path="compatibility-combinations"
            element={
              <ProtectedRoute
                component={CompatibilityCombinationsPage}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="personalities"
            element={
              <ProtectedRoute
                component={PersonalitiesPage}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="daily-recommendations"
            element={
              <ProtectedRoute
                component={DailyRecommendationsPage}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="yearly-recommendations"
            element={
              <ProtectedRoute
                component={YearlyRecommendationsPage}
                redirectTo="/login"
              />
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
