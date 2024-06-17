import { Transition, TransitionChild } from '@headlessui/react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { NavLinks } from '../../navbar/components/NavLinks';
import { getVisibleNavLinks } from '../../navbar/utils/navbarUtils';
import { SignInData } from '../../../shared/definitions/auth';
import { RootState } from '../../../redux/store';
import { LogoHeader } from './LogoHeader';
import { IoCloseOutline } from 'react-icons/io5';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: SignInData;
}

const BurgerMenu = ({ isOpen, onClose, currentUser }: BurgerMenuProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const visibleLinks = getVisibleNavLinks(currentUser);

  return (
    <Transition show={isOpen}>
      <div className="fixed inset-0 z-50 flex xl:hidden">
        <TransitionChild
          enter="transition-opacity ease-linear duration-400"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-400"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/20" onClick={onClose}></div>
        </TransitionChild>

        <TransitionChild
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="burger-menu flex h-full flex-col bg-granite gap-2 pb-3">
            <header className='flex flex-row justify-between items-center gap-2 px-3'>
              <LogoHeader />
              <span className="text-lg flex-1">My Blossom</span>
              <button className="close-btn opacity-60 hover:opacity-100" onClick={onClose}>
                <IoCloseOutline />
              </button>
            </header>
            <nav className="relative flex flex-col w-full overflow-auto gap-3">
              <NavLinks links={visibleLinks} />
            </nav>
          </div>
        </TransitionChild>
      </div>
    </Transition>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentUser: state.auth.user,
});

const connector = connect(mapStateToProps, null);

export default connector(BurgerMenu);
