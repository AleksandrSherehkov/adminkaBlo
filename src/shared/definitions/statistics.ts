export interface LoadStatisticsRequest {
  period: number;
  timeZoneOffset: number;
}
export interface LoadSalesResponse {
  period: string;
  subscriptions: number;
  oneTimePurchases: number;
}

export interface LoadUsersActivityResponse {
  period: string;
  registrations: number;
  invitations: number;
  connectionRequests: number;
}

export interface LoadAppFeaturesUsageResponse {
  period: string;
  natalCharts: number;
  compatibilityTests: number;
  oracleQuestions: number;
}
