import { SignInData } from '../definitions/auth';

export const hasAccessRule = (
  user: SignInData | null,
  accessRule: string,
): boolean => {
  return (user?.user.accessRules.indexOf(accessRule) ?? -1) > -1;
};

export const hasAnyAccessRule = (
  user: SignInData | null,
  accessRules: string[],
): boolean => {
  return accessRules.some(x => hasAccessRule(user, x));
};
