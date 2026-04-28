export const SALON_NAME = 'Scissorhands';
export const SALON_ADDRESS = '2728 NC-55, Cary, NC 27519';
export const SALON_LOCATION_LABEL = 'Cary studio';
export const SALON_HERO_EYEBROW = 'Modern salon studio in Cary';
export const SALON_HERO_COPY = 'Precision cuts, soft texture, and polished styling tailored to your day-to-day routine.';
export const SALON_ABOUT_HEADING = 'Quiet, polished salon work with a modern finish.';
export const SALON_ABOUT_COPY = 'Scissorhands offers precision cuts, texture services, and styling appointments with a clean, relaxed experience designed around effortless upkeep.';
export const SALON_BOOKING_COPY = 'Select a service, stylist, date, and time. A card can be placed on file to hold your appointment.';
export const SALON_POLICY_COPY = 'Your card is used only to hold the appointment. You will not be charged today unless you choose to prepay. Missed appointments or late cancellations may be subject to a no-show fee.';
export const SALON_POLICY_ACKNOWLEDGEMENT = 'I understand that my card may be charged a no-show or late-cancellation fee according to the salon policy.';

export const SALON_HOURS = [
  { label: 'Monday - Friday', value: '10:00 AM - 6:00 PM' },
  { label: 'Saturday', value: '10:00 AM - 4:00 PM' },
  { label: 'Sunday', value: 'Closed' }
] as const;

export function getMaskedCardLabel(cardLast4: string) {
  return cardLast4 ? `Ending in ${cardLast4}` : 'No card on file';
}
