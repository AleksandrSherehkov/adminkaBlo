import React from 'react';
import { loadAppFeaturesUsage } from '../../../services/api';
import { LoadAppFeaturesUsageResponse } from '../../../shared/definitions/statistics';
import { StatisticsWidget } from './StatisticsWidget';

export const AppFeaturesUsageWidget: React.FC = () => (
  <StatisticsWidget<LoadAppFeaturesUsageResponse>
    title="App Feature Usage"
    loadStatistics={loadAppFeaturesUsage}
    seriesConfig={[
      { name: 'Natal Charts', dataKey: 'natalCharts', color: '#1F3A93' },
      {
        name: 'Compatibility Tests',
        dataKey: 'compatibilityTests',
        color: '#F5AB35',
      },
      {
        name: 'Oracle Questions',
        dataKey: 'oracleQuestions',
        color: '#1BBC9B',
      },
    ]}
  />
);
