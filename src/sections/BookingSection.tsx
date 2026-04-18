import { BookingForm } from '@/components/BookingForm';
import type { BookingDraft, Service, Stylist, TimeSlotOption } from '@/lib/types';

interface BookingSectionProps {
  compact?: boolean;
  draft: BookingDraft;
  bookingError: string;
  services: Service[];
  stylists: Stylist[];
  timeSlots: TimeSlotOption[];
  confirmed: boolean;
  isSubmittingBooking: boolean;
  onDraftChange: (draft: BookingDraft) => void;
  onConfirm: () => void;
  onResetConfirmation: () => void;
}

export function BookingSection({ compact = false, ...bookingProps }: BookingSectionProps) {
  return (
    <section className={`page-section booking-section ${compact ? 'booking-section--compact' : ''}`} id="booking">
      <div className="section-heading section-heading--compact">
        <p className="eyebrow">Reservations</p>
        <h2>Book your appointment</h2>
      </div>
      <BookingForm {...bookingProps} />
    </section>
  );
}
