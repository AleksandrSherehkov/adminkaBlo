import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/hook';
import {
  selectIsRefreshing,
  selectLoggedIn,
} from '../../redux/auth/authSelectors';

interface RouteProps {
  component: React.ComponentType;
  redirectTo?: string;
}

export const ProtectedRoute: FC<RouteProps> = ({
  component: Component,
  redirectTo = '/login',
}) => {
  const location = useLocation();
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? (
    <Navigate to={redirectTo} state={{ from: location }} />
  ) : (
    <Component />
  );
};
