import { useEffect, useMemo, useState } from 'react';
import { seedServices, seedStylists, stylistAvailability } from '@/data/salonData';
import { cancelAppointment as cancelSupabaseAppointment, insertAppointment, listAppointments, updateAppointment } from '@/integrations/supabase/appointments';
import { isSupabaseConfigured } from '@/integrations/supabase/client';
import { createAppointment, findService, getAvailableTimeSlots } from '@/lib/salonModel';
import type { Appointment, AppointmentStatus, BookingDraft, Service, Stylist } from '@/lib/types';

const defaultBookingDraft: BookingDraft = {
  name: '',
  phone: '',
  email: '',
  date: '2026-04-22',
  time: '',
  serviceId: '',
  stylistId: 'no-preference',
  notes: ''
};

export function useSalonState() {
  const [services] = useState<Service[]>(seedServices);
  const [stylists] = useState<Stylist[]>(seedStylists);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
  const [adminStatusFilter, setAdminStatusFilter] = useState<AppointmentStatus>('upcoming');
  const [bookingDraft, setBookingDraft] = useState<BookingDraft>(defaultBookingDraft);
  const selectedService = findService(services, bookingDraft.serviceId);

  useEffect(() => {
    refreshAppointments();
  }, []);

  const timeSlots = useMemo(() => getAvailableTimeSlots({
    serviceId: bookingDraft.serviceId,
    stylistId: bookingDraft.stylistId,
    date: bookingDraft.date,
    durationMinutes: selectedService?.durationMinutes ?? 30,
    services,
    stylists,
    availability: stylistAvailability,
    appointments
  }), [appointments, bookingDraft.date, bookingDraft.serviceId, bookingDraft.stylistId, selectedService?.durationMinutes, services, stylists]);

  function updateBookingDraft(draft: BookingDraft) {
    setBookingDraft(draft);
    setConfirmed(false);
    setBookingError('');
  }

  function resetBookingDraft() {
    setConfirmed(false);
    setBookingError('');
    setBookingDraft(defaultBookingDraft);
  }

  async function confirmBooking() {
    if (isSubmittingBooking) {
      return;
    }

    setIsSubmittingBooking(true);
    setBookingError('');
    const result = createAppointment({
      input: {
        customerName: bookingDraft.name,
        phone: bookingDraft.phone,
        email: bookingDraft.email,
        serviceId: bookingDraft.serviceId,
        stylistId: bookingDraft.stylistId,
        date: bookingDraft.date,
        time: bookingDraft.time,
        notes: bookingDraft.notes
      },
      appointments,
      services,
      stylists,
      availability: stylistAvailability,
      id: `apt-${Date.now()}`
    });

    if (!result.ok) {
      setConfirmed(false);
      setBookingError(result.error);
      setIsSubmittingBooking(false);
      return;
    }

    try {
      const savedAppointment = await insertAppointment({
        customerName: result.appointment.customerName,
        phone: result.appointment.phone,
        email: result.appointment.email,
        serviceId: result.appointment.serviceId,
        stylistId: result.appointment.stylistId,
        date: result.appointment.date,
        time: result.appointment.time,
        notes: result.appointment.notes
      });

      setAppointments((current) => [...current, savedAppointment].sort(sortAppointments));
      setConfirmed(true);
      setBookingError('');
    } catch (error) {
      setConfirmed(false);
      setBookingError(getErrorMessage(error));
    } finally {
      setIsSubmittingBooking(false);
    }
  }

  async function refreshAppointments() {
    if (!isSupabaseConfigured) {
      setAdminError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      return;
    }

    setIsLoadingAppointments(true);
    setAdminError('');

    try {
      setAppointments(await listAppointments());
    } catch (error) {
      setAdminError(getErrorMessage(error));
    } finally {
      setIsLoadingAppointments(false);
    }
  }

  async function saveAppointment(updatedAppointment: Appointment) {
    setAdminError('');

    try {
      const savedAppointment = await updateAppointment(updatedAppointment);
      setAppointments((current) => current.map((appointment) => (
        appointment.id === savedAppointment.id ? savedAppointment : appointment
      )).sort(sortAppointments));
      setSelectedAppointment(null);
    } catch (error) {
      setAdminError(getErrorMessage(error));
    }
  }

  async function cancelAppointment(appointmentId: string) {
    setAdminError('');

    try {
      const savedAppointment = await cancelSupabaseAppointment(appointmentId);
      setAppointments((current) => current.map((appointment) => (
        appointment.id === savedAppointment.id ? savedAppointment : appointment
      )).sort(sortAppointments));
      setSelectedAppointment(null);
    } catch (error) {
      setAdminError(getErrorMessage(error));
    }
  }

  const filteredAppointments = appointments.filter((appointment) => appointment.status === adminStatusFilter);

  return {
    adminError,
    adminStatusFilter,
    appointments,
    bookingError,
    bookingDraft,
    confirmed,
    filteredAppointments,
    isLoadingAppointments,
    isSubmittingBooking,
    selectedAppointment,
    services,
    stylistAvailability,
    stylists,
    timeSlots,
    cancelAppointment,
    confirmBooking,
    refreshAppointments,
    resetBookingDraft,
    saveAppointment,
    setAdminStatusFilter,
    setSelectedAppointment,
    updateBookingDraft
  };
}

function sortAppointments(a: Appointment, b: Appointment) {
  return `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`);
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
}
