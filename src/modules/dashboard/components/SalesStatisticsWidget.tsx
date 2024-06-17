import React from 'react';
import { loadSalesStatistics } from '../../../services/api';
import { LoadSalesResponse } from '../../../shared/definitions/statistics';
import { StatisticsWidget } from './StatisticsWidget';

export const SalesStatisticsWidget: React.FC = () => (
  <StatisticsWidget<LoadSalesResponse>
    title="Purchase Statistics"
    loadStatistics={loadSalesStatistics}
    seriesConfig={[
      { name: 'Subscriptions', dataKey: 'subscriptions', color: '#00E396' },
      {
        name: 'One-time Purchases',
        dataKey: 'oneTimePurchases',
        color: '#FEB019',
      },
    ]}
  />
);
