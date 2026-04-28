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
  route: '/' | '/booking' | '/admin';
  title: string;
  body: string;
  target: string;
}
