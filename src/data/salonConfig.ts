export const SALON_NAME = 'Precision Barber Co.';
export const SALON_ADDRESS = '2 Cliveden St #301, Quincy, MA 02169';
export const SALON_LOCATION_LABEL = 'Quincy barbershop';
export const SALON_HERO_EYEBROW = 'Precision Barber Co.';
export const SALON_HERO_COPY = 'Precision Barber Co. offers clean cuts, beard work, and a polished barbershop experience in Quincy.';
export const SALON_ABOUT_HEADING = 'Cuts, beard work, and clean service.';
export const SALON_ABOUT_COPY = 'Precision Barber Co. focuses on quality barbering, sharp detailing, and a clean modern shop experience.';
export const SALON_BOOKING_COPY = 'Select a service, barber, date, and time. A card can be placed on file to hold your appointment.';
export const SALON_POLICY_COPY = 'Your card is used only to hold the appointment. You will not be charged today unless you choose to prepay. Missed appointments or late cancellations may be subject to a no-show fee.';
export const SALON_POLICY_ACKNOWLEDGEMENT = 'I understand that my card may be charged a no-show or late-cancellation fee according to the barbershop policy.';

export const SALON_HOURS = [
  { label: 'Monday - Friday', value: '10:00 AM - 6:00 PM' },
  { label: 'Saturday', value: '10:00 AM - 4:00 PM' },
  { label: 'Sunday', value: 'Closed' }
] as const;

export function getMaskedCardLabel(cardLast4: string) {
  return cardLast4 ? `Ending in ${cardLast4}` : 'No card on file';
}
