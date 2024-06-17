import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../../../redux/store';

type UserInfoProps = ConnectedProps<typeof connector>;

export const UserInfo: React.FC<UserInfoProps> = ({ currentUser }) => {
  return (
    <div className="">
      {currentUser.user.name && (
        <p className="text-base ">{currentUser.user.name}</p>
      )}
      <p className="text-xs italic">{currentUser.user.email}</p>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentUser: state.auth.user,
});

const connector = connect(mapStateToProps, null);
export default connector(UserInfo);
