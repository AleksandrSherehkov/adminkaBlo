import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/hook';
import { selectLoggedIn } from '../../redux/auth/authSelectors';

interface RouteProps {
  component: React.ComponentType;
  redirectTo?: string;
}

export const PublicRoute: FC<RouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const location = useLocation();
  const isLoggedIn = useAppSelector(selectLoggedIn);

  return isLoggedIn ? (
    <Navigate to={location?.state?.from || redirectTo} />
  ) : (
    <Component />
  );
};
