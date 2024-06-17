import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Select, SelectItem, Spinner } from '@nextui-org/react';
import { LoadStatisticsRequest } from '../../../shared/definitions/statistics';
import { handleError } from '../../../services/errorHandler';

type LoadStatisticsFunction<T> = (
  params: LoadStatisticsRequest,
) => Promise<T[]>;

interface StatisticsWidgetProps<T> {
  title: string;
  loadStatistics: LoadStatisticsFunction<T>;
  seriesConfig: {
    name: string;
    dataKey: keyof T;
    color: string;
  }[];
  additionalClasses?: string; // New prop for additional classes
}

export const StatisticsWidget = <T,>({
  title,
  loadStatistics,
  seriesConfig,
  additionalClasses = '', // Default to empty string if not provided
}: StatisticsWidgetProps<T>) => {
  const [period, setPeriod] = useState<string>('week');
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const periods = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
  ];

  const mapPeriodToNumber = (period: string): number => {
    const periodMap: { [key: string]: number } = {
      day: 0,
      week: 1,
      month: 2,
      year: 3,
    };
    return periodMap[period] || 0;
  };

  const fetchStatisticsData = async (period: string) => {
    setLoading(true);
    try {
      const params: LoadStatisticsRequest = {
        period: mapPeriodToNumber(period),
        timeZoneOffset: new Date().getTimezoneOffset(),
      };
      const response = await loadStatistics(params);
      setData(response);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatisticsData(period);
  }, [period]);

  const handlePeriodChange = (value: string) => {
    if (value) {
      setPeriod(value);
    } else {
      setPeriod('week');
    }
  };

  const getTotal = (type: keyof T) => {
    if (!data) return 0;
    return data.reduce((acc, curr) => {
      const value = curr[type];
      return acc + (typeof value === 'number' ? value : 0);
    }, 0);
  };

  const updateXAxisCategories = (data: T[] | null) => {
    if (!data) return [];
    return data.map((d: any) => d.period);
  };

  const chartOptions: ApexOptions = {
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 0,
      offsetY: 0,

      fontFamily: 'Roboto, sans-serif',
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
      },
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
    stroke: {
      curve: 'smooth',
    },
    chart: {
      type: 'area',
      toolbar: {
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
    },
    xaxis: {
      categories: updateXAxisCategories(data),
      labels: {
        style: {
          fontFamily: 'Roboto, sans-serif',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: 'Roboto, sans-serif',
        },
      },
      title: {
        text: 'Amount',
        style: {
          fontFamily: 'Roboto, sans-serif',
        },
      },
    },
    colors: seriesConfig.map(series => series.color),
  };

  const series: ApexAxisChartSeries = seriesConfig.map(series => ({
    name: series.name,
    data: data ? data.map(d => d[series.dataKey] as number) : [],
  }));

  return (
    <div
      className={`relative flex basis-[49%] flex-col gap-2 overflow-hidden rounded-md border-1 bg-white p-4 shadow ${additionalClasses}`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold">{title}</h2>
        <Select
          placeholder="Select a period"
          onChange={e => handlePeriodChange(e.target.value)}
          selectedKeys={[period]}
          className="max-w-[100px]"
          aria-label="Select period"
        >
          {periods.map(period => (
            <SelectItem key={period.value} value={period.value}>
              {period.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="min-h-[350px] ">
        {loading && (
          <div className="absolute left-0 top-0 z-[100] flex h-full w-full items-center justify-center bg-black/50">
            <Spinner
              size="lg"
              label="Loading..."
              color="warning"
              classNames={{
                label: 'text-2xl text-white',
              }}
              className="absolute left-1/2 top-1/2 z-[100] -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        )}
        <Chart
          options={chartOptions}
          series={series}
          type="area"
          height={'100%'}
          width={'100%'}
        />
      </div>
      <div className="legend ml-10  flex flex-col justify-center gap-1 text-sm lg:flex-row lg:gap-8">
        {seriesConfig.map(series => (
          <p key={series.name}>
            <span style={{ color: series.color }}>{series.name}</span> :{' '}
            {getTotal(series.dataKey)}
          </p>
        ))}
      </div>
    </div>
  );
};
