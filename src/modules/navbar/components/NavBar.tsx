import { connect, ConnectedProps } from 'react-redux';
import { NavLinks } from './NavLinks';
import { getVisibleNavLinks } from '../utils/navbarUtils';
import { RootState } from '../../../redux/store';

type NavBarProps = ConnectedProps<typeof connector>;

const NavBar: React.FC<NavBarProps> = ({ currentUser }) => {
  const visibleLinks = getVisibleNavLinks(currentUser);

  return (
    <aside className="h-my-calc hidden min-w-[280px] flex-col items-stretch gap-2 overflow-auto bg-granite px-3 pt-[22px] xl:flex xl:pt-0">
      <nav>
        <NavLinks links={visibleLinks} />
      </nav>
    </aside>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentUser: state.auth.user,
});

const connector = connect(mapStateToProps, null);
export default connector(NavBar);
