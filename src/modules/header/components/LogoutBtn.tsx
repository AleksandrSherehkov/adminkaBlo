import { useAppDispatch } from '../../../redux/hook';
import { LogoutThunk } from '../../../redux/auth/authOperations';

import { HiOutlineLogout } from 'react-icons/hi';

export const LogoutBtn = () => {
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    close();
    dispatch(LogoutThunk());
  };

  return (
    <button
      onClick={handleSignOut}
      type="button"
      className="btn bazi-btn flex cursor-pointer items-center justify-center gap-3 !rounded-full p-2 xl:!rounded-2xl xl:px-4"
    >
      <span className="hidden xl:block xl:text-base">Log Out</span>
      <HiOutlineLogout size={27} className="rotate-180 stroke-white " />
    </button>
  );
};
