import React from 'react';
import { loadUsersActivity } from '../../../services/api';
import { LoadUsersActivityResponse } from '../../../shared/definitions/statistics';
import { StatisticsWidget } from './StatisticsWidget';

export const UserActivityWidget: React.FC = () => (
  <StatisticsWidget<LoadUsersActivityResponse>
    title="User Activity"
    loadStatistics={loadUsersActivity}
    seriesConfig={[
      { name: 'Registrations', dataKey: 'registrations', color: '#1F3A93' },
      { name: 'Invitations', dataKey: 'invitations', color: '#F5AB35' },
      {
        name: 'Connection Requests',
        dataKey: 'connectionRequests',
        color: '#1BBC9B',
      },
    ]}
  />
);
