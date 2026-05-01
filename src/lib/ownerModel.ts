import type { BarberReport, ProductInventoryItem, ProductSale, TaxSummary } from './types';

interface BuildOwnerOverviewMetricsArgs {
  barberReports: BarberReport[];
  productInventory: ProductInventoryItem[];
  productSales: ProductSale[];
  taxSummaries: TaxSummary[];
}

export function buildOwnerOverviewMetrics({
  barberReports,
  productInventory,
  productSales,
  taxSummaries
}: BuildOwnerOverviewMetricsArgs) {
  const weeklyRevenue = sum(barberReports.map((report) => report.serviceRevenue)) + sum(productSales.map((sale) => sale.amount));
  const serviceRevenue = sum(barberReports.map((report) => report.serviceRevenue));
  const productRevenue = sum(productSales.map((sale) => sale.amount));
  const refunds = sum(barberReports.map((report) => report.refunds));
  const discounts = sum(barberReports.map((report) => report.discounts));
  const estimatedBarberPayouts = sum(barberReports.map((report) => report.estimatedServicePayout));
  const productCommissionOwed = sum(productSales.map((sale) => sale.commissionOwed));
  const shopRetainedRevenue = serviceRevenue - estimatedBarberPayouts + productRevenue - productCommissionOwed;
  const appointmentsThisWeek = sum(barberReports.map((report) => report.appointments));
  const cardHoldsCaptured = sum(barberReports.map((report) => report.cardHoldsCaptured));
  const prepaidBookings = sum(barberReports.map((report) => report.prepaidBookings));
  const lowStockItems = productInventory.filter((item) => item.currentStock <= item.lowStockThreshold).length;

  return {
    weeklyRevenue: roundCurrency(weeklyRevenue),
    serviceRevenue: roundCurrency(serviceRevenue),
    productSales: roundCurrency(productRevenue),
    refunds: roundCurrency(refunds),
    discounts: roundCurrency(discounts),
    estimatedBarberPayouts: roundCurrency(estimatedBarberPayouts),
    shopRetainedRevenue: roundCurrency(shopRetainedRevenue),
    appointmentsThisWeek,
    cardHoldsCaptured,
    prepaidBookings,
    productCommissionOwed: roundCurrency(productCommissionOwed),
    lowStockItems,
    totalReportablePayments: roundCurrency(sum(taxSummaries.map((summary) => summary.totalReportable)))
  };
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

function roundCurrency(value: number) {
  return Math.round(value * 100) / 100;
}
