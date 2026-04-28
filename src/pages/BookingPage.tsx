import { BrandMark } from '@/components/BrandMark';
import { SALON_ADDRESS, SALON_BOOKING_COPY } from '@/data/salonConfig';
import { BookingSection } from '@/sections/BookingSection';
import type { BookingDraft, Service, Stylist, ThemeMode, TimeSlotOption } from '@/lib/types';

interface BookingPageProps {
  draft: BookingDraft;
  bookingError: string;
  services: Service[];
  stylists: Stylist[];
  timeSlots: TimeSlotOption[];
  confirmed: boolean;
  isSubmittingBooking: boolean;
  theme: ThemeMode;
  onDraftChange: (draft: BookingDraft) => void;
  onConfirm: () => void;
  onResetConfirmation: () => void;
}

export function BookingPage(props: BookingPageProps) {
  return (
    <main className="view-shell view-shell--narrow" id="top">
      <section className="booking-page-intro">
        <p className="eyebrow">Reservations</p>
        <h1>Reserve your Scissorhands appointment.</h1>
        <p>{SALON_BOOKING_COPY}</p>
        <p className="booking-page-address">{SALON_ADDRESS}</p>
      </section>
      <BookingSection {...props} />
    </main>
  );
}
