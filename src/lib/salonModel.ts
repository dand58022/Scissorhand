import { getMaskedCardLabel } from '@/data/salonConfig';
import type { Appointment, BookingDraft, CreateAppointmentInput, Service, Stylist, StylistAvailability, TimeSlotOption } from './types';

export function findService(services: Service[], serviceId: string) {
  return services.find((service) => service.id === serviceId);
}

export function findStylist(stylists: Stylist[], stylistId: string) {
  return stylists.find((stylist) => stylist.id === stylistId);
}

export function formatPrice(price?: number) {
  if (price === undefined) {
    return '$0';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
}

export function getAppointmentSummary(draft: BookingDraft, services: Service[], stylists: Stylist[]) {
  const service = findService(services, draft.serviceId);
  const stylist = findStylist(stylists, draft.stylistId);

  return {
    serviceName: service?.name ?? 'Select a service',
    price: service?.price,
    durationMinutes: service?.durationMinutes,
    stylistName: draft.stylistId === 'no-preference' ? 'No preference' : stylist?.name ?? 'Choose a stylist',
    dateTime: draft.date && draft.time ? `${draft.date} at ${draft.time}` : 'Choose date and time',
    paymentOptionLabel: getPaymentOptionLabel(draft.paymentOption),
    cardOnFileLabel: draft.cardNumber ? 'Yes' : 'No',
    cardLabel: getMaskedCardLabel(getCardLast4(draft.cardNumber)),
    policyAcceptedLabel: draft.policyAccepted ? 'Accepted' : 'Pending'
  };
}

export function getCompatibleStylists(stylists: Stylist[], serviceId: string) {
  if (!serviceId) {
    return stylists;
  }

  return stylists.filter((stylist) => stylist.serviceIds.includes(serviceId));
}

interface AvailableTimeSlotInput {
  serviceId: string;
  stylistId: string;
  date: string;
  durationMinutes: number;
  services: Service[];
  stylists: Stylist[];
  availability: StylistAvailability[];
  appointments?: Appointment[];
}

export function getAvailableTimeSlots({
  serviceId,
  stylistId,
  date,
  durationMinutes,
  services,
  stylists,
  availability,
  appointments = []
}: AvailableTimeSlotInput): TimeSlotOption[] {
  const hasSpecificStylist = Boolean(stylistId && stylistId !== 'no-preference');
  if (!date || (!serviceId && !hasSpecificStylist)) {
    return [];
  }

  const service = findService(services, serviceId);
  if (serviceId && !service) {
    return [];
  }

  const compatibleStylists = (serviceId ? getCompatibleStylists(stylists, serviceId) : stylists)
    .filter((stylist) => stylist.id !== 'no-preference')
    .filter((stylist) => !stylistId || stylistId === 'no-preference' || stylist.id === stylistId);
  const compatibleStylistIds = new Set(compatibleStylists.map((stylist) => stylist.id));
  const timeMap = new Map<string, Set<string>>();

  availability
    .filter((entry) => entry.date === date && compatibleStylistIds.has(entry.stylistId))
    .forEach((entry) => {
      entry.times
        .filter((time) => isAlignedToDuration(time, durationMinutes))
        .filter((time) => !hasAppointmentOverlap({
          appointments,
          services,
          stylistId: entry.stylistId,
          date,
          time,
          durationMinutes
        }))
        .forEach((time) => {
          const stylistIds = timeMap.get(time) ?? new Set<string>();
          stylistIds.add(entry.stylistId);
          timeMap.set(time, stylistIds);
        });
    });

  return Array.from(timeMap.entries())
    .sort(([timeA], [timeB]) => timeToMinutes(timeA) - timeToMinutes(timeB))
    .map(([time, stylistIds]) => ({
      time,
      intervalMinutes: durationMinutes,
      disabled: false,
      stylistIds: Array.from(stylistIds)
    }));
}

interface CreateAppointmentArgs {
  input: CreateAppointmentInput;
  appointments: Appointment[];
  services: Service[];
  stylists: Stylist[];
  availability: StylistAvailability[];
  id?: string;
}

export type CreateAppointmentResult =
  | { ok: true; appointment: Appointment }
  | { ok: false; error: string };

export function createAppointment({
  input,
  appointments,
  services,
  stylists,
  availability,
  id = `apt-${Date.now()}`
}: CreateAppointmentArgs): CreateAppointmentResult {
  const service = findService(services, input.serviceId);
  if (!service) {
    return { ok: false, error: 'Select a valid service.' };
  }

  if (!input.policyAccepted) {
    return { ok: false, error: 'Please acknowledge the no-show and late-cancellation policy.' };
  }

  if (input.stylistId !== 'no-preference' && hasAppointmentOverlap({
    appointments,
    services,
    stylistId: input.stylistId,
    date: input.date,
    time: input.time,
    durationMinutes: service.durationMinutes
  })) {
    return { ok: false, error: 'That time overlaps with an existing appointment.' };
  }

  const matchingSlots = getAvailableTimeSlots({
    serviceId: input.serviceId,
    stylistId: input.stylistId,
    date: input.date,
    durationMinutes: service.durationMinutes,
    services,
    stylists,
    availability,
    appointments
  });
  const selectedSlot = matchingSlots.find((slot) => slot.time === input.time);
  const assignedStylistId = input.stylistId === 'no-preference'
    ? selectedSlot?.stylistIds?.[0]
    : input.stylistId;

  if (!assignedStylistId || !selectedSlot) {
    return { ok: false, error: 'That time is no longer available.' };
  }

  if (hasAppointmentOverlap({
    appointments,
    services,
    stylistId: assignedStylistId,
    date: input.date,
    time: input.time,
    durationMinutes: service.durationMinutes
  })) {
    return { ok: false, error: 'That time overlaps with an existing appointment.' };
  }

  return {
    ok: true,
    appointment: {
      id,
      customerName: input.customerName,
      phone: input.phone,
      email: input.email,
      serviceId: input.serviceId,
      stylistId: assignedStylistId,
      date: input.date,
      time: input.time,
      status: 'upcoming',
      notes: input.notes,
      paymentOption: input.paymentOption,
      cardOnFile: input.cardOnFile,
      cardLast4: input.cardLast4,
      paymentStatus: input.paymentStatus,
      policyAccepted: input.policyAccepted
    }
  };
}

interface AppointmentOverlapInput {
  appointments: Appointment[];
  services: Service[];
  stylistId: string;
  date: string;
  time: string;
  durationMinutes: number;
}

export function hasAppointmentOverlap({
  appointments,
  services,
  stylistId,
  date,
  time,
  durationMinutes
}: AppointmentOverlapInput) {
  const candidateStart = timeToMinutes(time);
  const candidateEnd = candidateStart + durationMinutes;

  return appointments
    .filter((appointment) => appointment.status !== 'cancelled')
    .filter((appointment) => appointment.stylistId === stylistId && appointment.date === date)
    .some((appointment) => {
      const appointmentService = findService(services, appointment.serviceId);
      const appointmentStart = timeToMinutes(appointment.time);
      const appointmentEnd = appointmentStart + (appointmentService?.durationMinutes ?? durationMinutes);

      return candidateStart < appointmentEnd && candidateEnd > appointmentStart;
    });
}

export function getAvailabilityContext(service?: Service, stylist?: Stylist) {
  if (!service) {
    if (stylist && stylist.id !== 'no-preference') {
      return `Available openings with ${stylist.name}`;
    }

    return 'Choose a service to view available times';
  }

  if (stylist && stylist.id !== 'no-preference') {
    return `Available openings for ${service.name} with ${stylist.name}`;
  }

  return `Available openings for ${service.name} across stylists`;
}

export function groupTimeSlotsByDayPart(slots: TimeSlotOption[]) {
  return {
    morning: slots.filter((slot) => timeToMinutes(slot.time) < 12 * 60),
    afternoon: slots.filter((slot) => timeToMinutes(slot.time) >= 12 * 60)
  };
}

export function getServiceName(services: Service[], serviceId: string) {
  return findService(services, serviceId)?.name ?? 'Unknown service';
}

export function getStylistName(stylists: Stylist[], stylistId: string) {
  return findStylist(stylists, stylistId)?.name ?? 'Unassigned';
}

export function getPaymentOptionLabel(paymentOption: CreateAppointmentInput['paymentOption']) {
  return paymentOption === 'prepay-now' ? 'Prepay now' : 'Pay in person';
}

export function getCardLast4(cardNumber: string) {
  return cardNumber.replace(/\D/g, '').slice(-4);
}

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function isAlignedToDuration(time: string, durationMinutes: number) {
  const minutes = timeToMinutes(time);
  if (durationMinutes === 20) {
    return minutes % 20 === 0;
  }

  if (durationMinutes === 30) {
    return minutes % 30 === 0;
  }

  return true;
}
