import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { LogoHeader } from './LogoHeader';
import UserInfo from './UserInfo';
import { LogoutBtn } from './LogoutBtn';
import BurgerMenu from './BurgerMenu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className="h-[84px] w-full bg-granite">
        <div className="flex px-3 py-3">
          <div className="flex w-full items-center gap-6">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="focus:outline-none xl:hidden"
            >
              <Bars3Icon className="h-6 w-6 text-blood-red" />
            </button>
            <LogoHeader />
            <h2 className="hidden text-lg sm:block">My Blossom Admin</h2>
          </div>
          <div className="flex w-full items-center justify-end gap-6">
            <UserInfo />
            <LogoutBtn />
          </div>
        </div>
      </header>

      <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
