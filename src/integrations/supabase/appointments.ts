import { supabase } from './client';
import type { Appointment, AppointmentStatus, CreateAppointmentInput } from '@/lib/types';

export interface AppointmentRow {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  stylist: string;
  date: string;
  time: string;
  notes: string | null;
  status: AppointmentStatus;
  created_at: string;
}

export type AppointmentInsert = Omit<AppointmentRow, 'id' | 'created_at'>;
export type AppointmentUpdate = Partial<AppointmentInsert>;

export async function listAppointments() {
  const client = requireSupabaseClient();
  const { data, error } = await client
    .from('appointments')
    .select('*')
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data as AppointmentRow[]).map(fromAppointmentRow);
}

export async function insertAppointment(input: CreateAppointmentInput) {
  const client = requireSupabaseClient();
  const payload: AppointmentInsert = {
    name: input.customerName,
    phone: input.phone,
    email: input.email,
    service: input.serviceId,
    stylist: input.stylistId,
    date: input.date,
    time: input.time,
    notes: input.notes,
    status: 'upcoming'
  };

  const { data, error } = await client
    .from('appointments')
    .insert(payload)
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return fromAppointmentRow(data as AppointmentRow);
}

export async function updateAppointment(appointment: Appointment) {
  const client = requireSupabaseClient();
  const payload: AppointmentUpdate = {
    name: appointment.customerName,
    phone: appointment.phone,
    email: appointment.email,
    service: appointment.serviceId,
    stylist: appointment.stylistId,
    date: appointment.date,
    time: appointment.time,
    notes: appointment.notes,
    status: appointment.status
  };

  const { data, error } = await client
    .from('appointments')
    .update(payload)
    .eq('id', appointment.id)
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return fromAppointmentRow(data as AppointmentRow);
}

export async function cancelAppointment(appointmentId: string) {
  const client = requireSupabaseClient();
  const { data, error } = await client
    .from('appointments')
    .update({ status: 'cancelled' })
    .eq('id', appointmentId)
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return fromAppointmentRow(data as AppointmentRow);
}

export function fromAppointmentRow(row: AppointmentRow): Appointment {
  return {
    id: row.id,
    customerName: row.name,
    phone: row.phone,
    email: row.email,
    serviceId: row.service,
    stylistId: row.stylist,
    date: row.date,
    time: row.time,
    status: row.status,
    notes: row.notes ?? '',
    createdAt: row.created_at
  };
}

function requireSupabaseClient() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.');
  }

  return supabase;
}
