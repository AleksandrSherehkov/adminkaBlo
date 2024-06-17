import { FC } from 'react';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';
import { AppFeaturesUsageWidget } from '../modules/dashboard/components/AppFeaturesUsageWidget';
import { SalesStatisticsWidget } from '../modules/dashboard/components/SalesStatisticsWidget';
import { UserActivityWidget } from '../modules/dashboard/components/UserActivityWidget';
import { ScrollableContent } from '../shared/components/ScrollableContent';
import { Title } from '../shared/components/Title';
import { SignInData } from '../shared/definitions/auth';
import { hasAccessRule } from '../shared/utils/access-utils';
import { ReadStatistics } from '../shared/constants/access-rules';

interface DashboardProps {
  currentUser: SignInData;
}
const DashboardPage: FC<DashboardProps> = ({ currentUser }) => {
  return (
    <>
      <Title text="Dashboard" />
      <ScrollableContent>
        {hasAccessRule(currentUser, ReadStatistics) && (
          <div className="flex flex-col justify-between  gap-y-6 lg:flex-row lg:flex-wrap">
            <SalesStatisticsWidget />
            <UserActivityWidget />
            <AppFeaturesUsageWidget />
          </div>
        )}
      </ScrollableContent>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentUser: state.auth.user,
});
const connector = connect(mapStateToProps, null);

export default connector(DashboardPage);
