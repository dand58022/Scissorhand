import { useEffect, useMemo, useState } from 'react';
import { demoAdminMetrics, demoAppointments, demoCustomers, demoRecentActivity, demoServices, demoStylists } from '@/data/demoData';
import { seedServices, seedStylists, stylistAvailability } from '@/data/salonData';
import { cancelAppointment as cancelSupabaseAppointment, insertAppointment, listAppointments, updateAppointment } from '@/integrations/supabase/appointments';
import { isSupabaseConfigured } from '@/integrations/supabase/client';
import { createAppointment, findService, getAvailableTimeSlots, getCardLast4 } from '@/lib/salonModel';
import type { AdminMetric, Appointment, AppointmentStatus, BookingDraft, CustomerProfile, RecentActivityItem, Service, Stylist } from '@/lib/types';

const defaultBookingDraft: BookingDraft = {
  name: '',
  phone: '',
  email: '',
  date: '2026-04-22',
  time: '',
  serviceId: '',
  stylistId: 'no-preference',
  notes: '',
  paymentOption: 'pay-in-person',
  cardholderName: '',
  cardNumber: '',
  expirationDate: '',
  cvc: '',
  billingZip: '',
  policyAccepted: false
};

export function useSalonState(isDemoMode = false) {
  const [services] = useState<Service[]>(seedServices);
  const [stylists] = useState<Stylist[]>(seedStylists);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [mockAppointments, setMockAppointments] = useState<Appointment[]>(demoAppointments);
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

  useEffect(() => {
    if (isDemoMode) {
      setMockAppointments(demoAppointments);
      setBookingDraft({
        ...defaultBookingDraft,
        name: 'Avery Collins',
        phone: '(919) 555-0141',
        email: 'avery.collins@example.com',
        date: '2026-04-22',
        time: '10:00',
        serviceId: 'haircut',
        stylistId: 'salon-artist-1',
        paymentOption: 'pay-in-person',
        cardholderName: 'Avery Collins',
        cardNumber: '4242 4242 4242 4242',
        expirationDate: '08/28',
        cvc: '123',
        billingZip: '27519',
        policyAccepted: true
      });
    }
  }, [isDemoMode]);

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

  const shouldUseMockAdminData = isDemoMode || !isSupabaseConfigured || (!isLoadingAppointments && (appointments.length === 0 || Boolean(adminError)));
  const adminAppointments = shouldUseMockAdminData ? mockAppointments : appointments;
  const adminServices = shouldUseMockAdminData ? demoServices : services;
  const adminStylists = shouldUseMockAdminData ? demoStylists : stylists;
  const adminMetrics: AdminMetric[] = demoAdminMetrics;
  const recentActivity: RecentActivityItem[] = demoRecentActivity;
  const customers: CustomerProfile[] = demoCustomers;
  const adminDataNotice = shouldUseMockAdminData
    ? (isDemoMode
      ? 'Demo mode is active. Barber and owner data are showing polished sample bookings and payment states.'
      : 'Showing sample barber and owner data because live appointments are unavailable.')
    : '';

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

    if (!bookingDraft.cardholderName || !bookingDraft.cardNumber || !bookingDraft.expirationDate || !bookingDraft.cvc || !bookingDraft.billingZip) {
      setConfirmed(false);
      setBookingError('Enter the demo card details to place a card on file for your appointment.');
      setIsSubmittingBooking(false);
      return;
    }

    const cardLast4 = getCardLast4(bookingDraft.cardNumber);
    const cardOnFile = Boolean(cardLast4);
    const paymentStatus = bookingDraft.paymentOption === 'prepay-now'
      ? 'paid'
      : (cardOnFile ? 'card-hold-only' : 'pending');

    const result = createAppointment({
      input: {
        customerName: bookingDraft.name,
        phone: bookingDraft.phone,
        email: bookingDraft.email,
        serviceId: bookingDraft.serviceId,
        stylistId: bookingDraft.stylistId,
        date: bookingDraft.date,
        time: bookingDraft.time,
        notes: bookingDraft.notes,
        paymentOption: bookingDraft.paymentOption,
        cardOnFile,
        cardLast4,
        paymentStatus,
        policyAccepted: bookingDraft.policyAccepted
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
        notes: result.appointment.notes,
        paymentOption: result.appointment.paymentOption,
        cardOnFile: result.appointment.cardOnFile,
        cardLast4: result.appointment.cardLast4,
        paymentStatus: result.appointment.paymentStatus,
        policyAccepted: result.appointment.policyAccepted
      });

      const hydratedAppointment = hydrateAppointment(savedAppointment, result.appointment);
      setAppointments((current) => [...current, hydratedAppointment].sort(sortAppointments));
      setConfirmed(true);
      setBookingError('');
    } catch (error) {
      const fallbackAppointment = result.appointment;
      setAppointments((current) => [...current, fallbackAppointment].sort(sortAppointments));
      setConfirmed(true);
      setBookingError(isDemoMode ? '' : `${getErrorMessage(error)} Showing the booking locally for demo purposes.`);
    } finally {
      setIsSubmittingBooking(false);
    }
  }

  async function refreshAppointments() {
    if (isDemoMode) {
      setAdminError('');
      setMockAppointments(demoAppointments);
      return;
    }

    if (!isSupabaseConfigured) {
      setAdminError('');
      return;
    }

    setIsLoadingAppointments(true);
    setAdminError('');

    try {
      setAppointments((await listAppointments()).map(withDefaultPaymentFields));
    } catch (error) {
      setAdminError('');
    } finally {
      setIsLoadingAppointments(false);
    }
  }

  async function saveAppointment(updatedAppointment: Appointment) {
    setAdminError('');

    if (shouldUseMockAdminData) {
      setMockAppointments((current) => current.map((appointment) => (
        appointment.id === updatedAppointment.id ? updatedAppointment : appointment
      )).sort(sortAppointments));
      setSelectedAppointment(null);
      return;
    }

    try {
      const savedAppointment = hydrateAppointment(await updateAppointment(updatedAppointment), updatedAppointment);
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

    if (shouldUseMockAdminData) {
      setMockAppointments((current) => current.map((appointment) => (
        appointment.id === appointmentId ? { ...appointment, status: 'cancelled' as const } : appointment
      )).sort(sortAppointments));
      setSelectedAppointment(null);
      return;
    }

    try {
      const savedAppointment = withDefaultPaymentFields(await cancelSupabaseAppointment(appointmentId));
      setAppointments((current) => current.map((appointment) => (
        appointment.id === savedAppointment.id ? savedAppointment : appointment
      )).sort(sortAppointments));
      setSelectedAppointment(null);
    } catch (error) {
      setAdminError(getErrorMessage(error));
    }
  }

  const filteredAppointments = adminAppointments.filter((appointment) => appointment.status === adminStatusFilter);

  return {
    adminError,
    adminDataNotice,
    adminStatusFilter,
    appointments: adminAppointments,
    adminMetrics,
    adminServices,
    adminStylists,
    bookingError,
    bookingDraft,
    confirmed,
    customers,
    filteredAppointments,
    isLoadingAppointments,
    isSubmittingBooking,
    isUsingMockAdminData: shouldUseMockAdminData,
    recentActivity,
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

function withDefaultPaymentFields(appointment: Appointment): Appointment {
  return {
    ...appointment,
    paymentOption: appointment.paymentOption ?? 'pay-in-person',
    cardOnFile: appointment.cardOnFile ?? false,
    cardLast4: appointment.cardLast4 ?? '',
    paymentStatus: appointment.paymentStatus ?? 'pending',
    policyAccepted: appointment.policyAccepted ?? false
  };
}

function hydrateAppointment(baseAppointment: Appointment, paymentSource: Appointment): Appointment {
  return withDefaultPaymentFields({
    ...baseAppointment,
    paymentOption: paymentSource.paymentOption,
    cardOnFile: paymentSource.cardOnFile,
    cardLast4: paymentSource.cardLast4,
    paymentStatus: paymentSource.paymentStatus,
    policyAccepted: paymentSource.policyAccepted
  });
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
}
