import { describe, expect, it } from 'vitest';
import { barberReports, productInventory, productSales, taxSummaries } from '@/data/ownerDemoData';
import { buildOwnerOverviewMetrics } from './ownerModel';

describe('owner model helpers', () => {
  it('builds owner overview metrics from report, product, and tax mock data', () => {
    const overview = buildOwnerOverviewMetrics({
      barberReports,
      productInventory,
      productSales,
      taxSummaries
    });

    expect(overview).toEqual({
      weeklyRevenue: 5090,
      serviceRevenue: 3820,
      productSales: 1270,
      refunds: 145,
      discounts: 95,
      estimatedBarberPayouts: 1979.5,
      shopRetainedRevenue: 3182.5,
      appointmentsThisWeek: 47,
      cardHoldsCaptured: 21,
      prepaidBookings: 14,
      productCommissionOwed: 95,
      lowStockItems: 2
    });
  });
});
