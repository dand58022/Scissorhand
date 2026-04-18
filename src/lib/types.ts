export type ThemeMode = 'light' | 'dark';
export type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled';

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
