export type ThemeMode = 'light' | 'dark';
export type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled';
export type PaymentOption = 'prepay-now' | 'pay-in-person';
export type PaymentStatus = 'paid' | 'pending' | 'card-hold-only';

export interface Service {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
  description: string;
}

export interface HomepageService {
  id: string;
  name: string;
  durationLabel: string;
  price: number;
  note?: string;
}

export interface Stylist {
  id: string;
  name: string;
  specialty: string;
  serviceIds: string[];
}

export interface Appointment {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  serviceId: string;
  stylistId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes: string;
  paymentOption: PaymentOption;
  cardOnFile: boolean;
  cardLast4: string;
  paymentStatus: PaymentStatus;
  policyAccepted: boolean;
  createdAt?: string;
}

export interface CreateAppointmentInput {
  customerName: string;
  phone: string;
  email: string;
  serviceId: string;
  stylistId: string;
  date: string;
  time: string;
  notes: string;
  paymentOption: PaymentOption;
  cardOnFile: boolean;
  cardLast4: string;
  paymentStatus: PaymentStatus;
  policyAccepted: boolean;
}

export interface BookingDraft {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  serviceId: string;
  stylistId: string;
  notes: string;
  paymentOption: PaymentOption;
  cardholderName: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  billingZip: string;
  policyAccepted: boolean;
}

export interface TimeSlotOption {
  time: string;
  intervalMinutes: number;
  disabled: boolean;
  stylistIds?: string[];
}

export interface StylistAvailability {
  date: string;
  stylistId: string;
  times: string[];
}

export interface CustomerProfile {
  id: string;
  name: string;
  visits: number;
  preferredServiceId: string;
  preferredStylistId: string;
  lastVisit: string;
  status: 'new' | 'returning' | 'vip';
}

export interface AdminMetric {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export interface RecentActivityItem {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
}

export interface DemoWalkthroughStep {
  id: string;
  route: '/' | '/customer' | '/booking' | '/barber' | '/owner';
  title: string;
  body: string;
  target: string;
}

export type BankStatus = 'Connected' | 'Verified' | 'Needs onboarding' | 'Pending' | 'Pending verification' | 'Disabled in demo';
export type DemoRole = 'Owner' | 'Barber' | 'Front Desk' | 'Customer';
export type DateRangeFilter = 'This week' | 'Last week' | 'Month to date' | 'Year to date';
export type PaymentTypeFilter = 'All' | 'Prepaid' | 'In-shop' | 'Product' | 'Refund';
export type OwnerTabId = 'overview' | 'barber-reports' | 'payouts' | 'product-sales' | 'tax-1099' | 'payment-setup' | 'access-control';

export interface BarberProfile {
  id: string;
  name: string;
  role: 'Barber';
  commissionRate: number;
  productCommissionRate: number;
  bankStatus: BankStatus;
  stripeStatus: BankStatus;
  payoutMethod: string;
  nextPayoutDate: string;
  initials: string;
}

export interface BarberReport {
  id: string;
  barberId: string;
  barberName: string;
  dateRange: Exclude<DateRangeFilter, 'All'> | DateRangeFilter;
  paymentType: PaymentTypeFilter;
  appointments: number;
  serviceRevenue: number;
  refunds: number;
  discounts: number;
  netServiceRevenue: number;
  tips: number;
  commissionPercent: number;
  estimatedServicePayout: number;
  productSales: number;
  productCommission: number;
  totalOwed: number;
  cardHoldsCaptured: number;
  prepaidBookings: number;
}

export interface PayoutAccount {
  barberId: string;
  barberName: string;
  bankStatus: BankStatus;
  stripeStatus: BankStatus;
  serviceRevenue: number;
  refundAdjustments: number;
  discountAdjustments: number;
  pendingPayout: number;
  nextPayoutDate: string;
  actionLabel: string;
}

export interface ProductInventoryItem {
  id: string;
  product: string;
  category: string;
  currentStock: number;
  lowStockThreshold: number;
  soldThisWeek: number;
  revenueThisWeek: number;
  status: 'Healthy' | 'Low stock' | 'Reorder soon';
}

export interface ProductSale {
  id: string;
  date: string;
  productName: string;
  barberId: string;
  barberName: string;
  clientName: string;
  amount: number;
  commissionRate: number;
  commissionOwed: number;
  settlementAccount: 'Shop bank account';
}

export interface TaxSummary {
  barberId: string;
  barberName: string;
  ytdServicePayouts: number;
  ytdProductCommission: number;
  totalReportable: number;
  w9Status: 'Ready' | 'Needs W-9' | 'Review required';
  status1099: 'Ready' | 'Review required' | 'Exported' | 'Demo only';
  lastUpdated: string;
}

export interface PaymentSetupItem {
  id: string;
  title: string;
  status: string;
  purpose: string;
  detail: string;
  bullets?: string[];
}

export interface DemoUserAccess {
  id: string;
  name: string;
  email: string;
  role: DemoRole;
  accessLevel: string;
  status: 'Active' | 'Pending invite' | 'Disabled' | 'Needs setup';
  lastLogin: string;
  inviteStatus: string;
}

export interface RolePermissionRow {
  feature: string;
  owner: boolean;
  barber: boolean;
  frontDesk: boolean;
  customer: boolean;
}
